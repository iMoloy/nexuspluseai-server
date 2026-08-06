import { User } from '../src/models/user.model';
import { generateAccessToken, verifyAccessToken } from '../src/utils/token.util';

const runAuthTests = async () => {
  console.log('=== Starting Auth & RBAC Integration Tests ===');

  const mockFreelancerData = {
    name: 'Sharif Ahmed',
    email: 'sharif@nexuspulse.ai',
    password: 'securePassword123!',
    role: 'FREELANCER' as const
  };

  // 1. Verify User Document Instantiation
  const user = new User(mockFreelancerData);
  console.log('✓ User model instance created with Role:', user.role);

  // 2. Verify JWT Access Token Generation
  const token = generateAccessToken(user);
  console.log('✓ JWT Access Token generated successfully:', token.substring(0, 30) + '...');

  // 3. Verify Token Payload Decoding
  const decoded = verifyAccessToken(token);
  console.log('✓ Token decoded successfully:');
  console.log('   - User Email:', decoded.email);
  console.log('   - Assigned Role:', decoded.role);

  if (decoded.role === 'FREELANCER' && decoded.email === 'sharif@nexuspulse.ai') {
    console.log('✅ Auth & RBAC Tests Passed 100% Successfully!');
  } else {
    console.error('❌ Role / Email payload verification failed.');
    process.exit(1);
  }
};

runAuthTests();
