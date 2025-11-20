# Qbazz Core API - Quick Test Script

Write-Host "=" -NoNewline
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "🧪 Qbazz Core API - Quick Test" -ForegroundColor Green
Write-Host "=" -NoNewline
Write-Host "============================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"

Write-Host "`n📍 Testing API endpoints...`n" -ForegroundColor Yellow

# Test 1: Health Check
Write-Host "1️⃣  Testing Health Check..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "   ✅ Health check passed" -ForegroundColor Green
    Write-Host "   Response: $($response.message)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Health check failed: $_" -ForegroundColor Red
}

# Test 2: Get Categories
Write-Host "`n2️⃣  Testing Get Categories..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/categories" -Method Get
    Write-Host "   ✅ Categories retrieved: $($response.data.categories.Count) categories found" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to get categories: $_" -ForegroundColor Red
}

# Test 3: Get Category Tree
Write-Host "`n3️⃣  Testing Get Category Tree..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/categories/tree" -Method Get
    Write-Host "   ✅ Category tree retrieved" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to get category tree: $_" -ForegroundColor Red
}

# Test 4: Create User
Write-Host "`n4️⃣  Testing Create User..." -ForegroundColor Cyan
try {
    $userData = @{
        telegramId = "111222333"
        firstName = "Test"
        lastName = "User"
        telegramUsername = "testuser"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/api/users" -Method Post `
        -ContentType "application/json" -Body $userData
    Write-Host "   ✅ User created successfully" -ForegroundColor Green
    Write-Host "   User ID: $($response.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "   ⚠️  User creation: $_" -ForegroundColor Yellow
}

# Test 5: Get Stores
Write-Host "`n5️⃣  Testing Get Stores..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/stores" -Method Get
    Write-Host "   ✅ Stores retrieved: $($response.data.Count) stores found" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to get stores: $_" -ForegroundColor Red
}

# Test 6: Get Products
Write-Host "`n6️⃣  Testing Get Products..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/products" -Method Get
    Write-Host "   ✅ Products retrieved: $($response.data.Count) products found" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to get products: $_" -ForegroundColor Red
}

Write-Host "`n" -NoNewline
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✅ API Testing Complete!" -ForegroundColor Green
Write-Host "============================================`n" -ForegroundColor Cyan

Write-Host "📚 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Check Prisma Studio: npm run prisma:studio"
Write-Host "   2. View logs in the terminal"
Write-Host "   3. Test with Postman or curl"
Write-Host "   4. Integrate with Telegram bot`n"
