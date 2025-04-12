# PowerShell script to directly test campus API

# File to store token
$tokenFile = "campus_token.txt"

# Function to get token, either from file or by authenticating
function Get-CampusToken {
    # Check if we have a token file with recent token (< 45 minutes old)
    if (Test-Path $tokenFile) {
        $tokenData = Get-Content $tokenFile | ConvertFrom-Json
        $timestamp = [DateTime]::Parse($tokenData.timestamp)
        $now = Get-Date
        
        # If token is less than 45 minutes old, reuse it
        if (($now - $timestamp).TotalMinutes -lt 45) {
            Write-Host "Using existing token from file (age: $(($now - $timestamp).TotalMinutes) minutes)"
            return $tokenData.token
        }
    }
    
    # Otherwise get a new token
    Write-Host "Getting new campus API token..."
    
    try {
        # Use form data for the campus API
        $formData = @{
            username = "johannes"
            password = "Del@2022"
        }
        
        $response = Invoke-RestMethod -Uri "https://cis-dev.del.ac.id/api/jwt-api/do-auth" -Method Post -Body $formData
        
        if ($response.result -eq $true) {
            $token = $response.token
            Write-Host "Successfully obtained token"
            
            # Save token to file with timestamp
            $tokenData = @{
                token = $token
                timestamp = (Get-Date).ToString("o")
            } | ConvertTo-Json
            
            Set-Content -Path $tokenFile -Value $tokenData
            
            return $token
        } else {
            Write-Host "Authentication failed: $($response.error)"
            return $null
        }
    } catch {
        Write-Host "Failed to authenticate with campus API: $_"
        if ($_.Exception.Response) {
            Write-Host "Status code: $($_.Exception.Response.StatusCode.value__)"
        }
        return $null
    }
}

# Get token
$token = Get-CampusToken
if ($null -eq $token) {
    Write-Host "Cannot proceed without valid token"
    exit 1
}

# Test fetching lecturers directly from campus API
Write-Host "Fetching lecturers from campus API..."
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "https://cis.del.ac.id/api/library-api/dosen" -Method Get -Headers $headers
    
    # Save the raw response for debugging
    $response | ConvertTo-Json -Depth 10 | Set-Content -Path "campus_lecturers_response.json"
    
    Write-Host "Successfully fetched lecturer data from campus API"
    Write-Host "Raw response saved to campus_lecturers_response.json"
    
    # Display basic stats
    $lecturers = $response.data.dosen
    Write-Host "Number of lecturers: $($lecturers.Count)"
    
    if ($lecturers.Count -gt 0) {
        Write-Host "First lecturer: $($lecturers[0] | ConvertTo-Json)"
    }
} catch {
    Write-Host "Failed to fetch lecturers from campus API: $_"
    if ($_.Exception.Response) {
        Write-Host "Status code: $($_.Exception.Response.StatusCode.value__)"
        
        # Try to read the response body for more details
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $reader.BaseStream.Position = 0
            $reader.DiscardBufferedData()
            $responseBody = $reader.ReadToEnd()
            Write-Host "Response body: $responseBody"
        } catch {
            Write-Host "Could not read response body: $_"
        }
    }
} 