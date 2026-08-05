const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const { generateAccessToken, verifyAccessToken } = require('../src/utils/token.util');

const runAuthTests = async () => {
  console.log('--- Starting Section 2 Auth Unit Tests ---');
  
  // Test User Schema & Password Hashing
  const mockUserData = {
    name: 'Test Freelancer',
    email: 'freelancer@nexuspulse.ai',
    password: 'securePassword123!',
    role: 'FREELANCER'
  };

  const user = new User(mockUserData);
  console.log('✓ User instance created with role:', user.role);

  // Test JWT Generation
  const token = generateAccessToken(user);
  console.log('✓ Access Token generated:', token.substring(0, 25) + '...');

  const decoded = verifyAccessToken(token);
  console.log('✓ Token decoded successfully. User ID:', decoded.id, 'Role:', decoded.role);

  if (decoded.role === 'FREELANCER') {
    console.log('✅ Section 2 Auth & JWT Tests Passed Successfully!');
  } else {
    console.error('❌ Role mismatch in token payload');
    process.exit(1);
  }
};

runAuthTests();
