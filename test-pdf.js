// Test script to verify PDF parsing functionality
console.log('Testing PDF parsing capability...');

// Check if pdf-parse is available
try {
    const pdfParse = require('pdf-parse');
    console.log('✅ pdf-parse package is available');
    console.log('Version:', pdfParse.version || 'Unknown version');
} catch (error) {
    console.log('❌ pdf-parse package not found:', error.message);
}

// Check if we can import dynamically (ES modules)
(async () => {
    try {
        const pdfParseModule = await import('pdf-parse');
        console.log('✅ Dynamic import of pdf-parse works');
        console.log('Default export available:', typeof pdfParseModule.default);
    } catch (error) {
        console.log('❌ Dynamic import failed:', error.message);
    }
})();

console.log('Test complete - check console output above');
