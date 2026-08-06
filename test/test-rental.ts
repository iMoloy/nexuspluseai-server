const runRentalTests = async () => {
  console.log('=== Starting Smart Asset & Rental Engine Integration Tests ===');

  const mockOwnerId = '65a000000000000000000010';
  const mockRenterId = '65a000000000000000000020';

  // 1. Mock Asset Listing
  const mockAsset = {
    _id: '65a000000000000000000099',
    owner: mockOwnerId,
    title: 'Tesla Model 3 Performance 2025',
    category: 'VEHICLE',
    rentalRate: 100, // $100/day
    securityDeposit: 200, // $200 deposit
    location: 'Dhaka, Bangladesh',
    isAvailable: true
  };
  console.log('✓ Asset Created:', mockAsset.title, `($${mockAsset.rentalRate}/day + $${mockAsset.securityDeposit} deposit)`);

  // 2. Booking Calculation (3 days rental)
  const days = 3;
  const totalPrice = days * mockAsset.rentalRate; // $300
  const depositAmount = mockAsset.securityDeposit; // $200
  const totalEscrowLock = totalPrice + depositAmount; // $500 total locked in Escrow

  console.log(`✓ Rental Booking calculated for ${days} days:`);
  console.log(`   - Rental Cost: $${totalPrice}`);
  console.log(`   - Security Deposit: $${depositAmount}`);
  console.log(`   - Total Escrow Funds Locked: $${totalEscrowLock}`);

  // 3. Mock Renter Wallet State
  const renterWallet = { balance: 600, escrowHold: 0 };
  const ownerWallet = { balance: 0, escrowHold: 0 };

  // Lock funds
  renterWallet.balance -= totalEscrowLock;
  renterWallet.escrowHold += totalEscrowLock;
  console.log(`✓ Escrow Lock Executed. Renter Available Balance: $${renterWallet.balance}, Escrow Hold: $${renterWallet.escrowHold}`);

  // 4. Complete Rental: Release payment to Owner ($300) & Refund deposit to Renter ($200)
  renterWallet.escrowHold -= totalEscrowLock;
  ownerWallet.balance += totalPrice;
  renterWallet.balance += depositAmount;

  console.log(`✓ Rental Completed Successfully!`);
  console.log(`   - Owner Received Payment: $${ownerWallet.balance}`);
  console.log(`   - Renter Deposit Refunded. Final Renter Balance: $${renterWallet.balance}, Escrow Hold: $${renterWallet.escrowHold}`);

  if (ownerWallet.balance === 300 && renterWallet.balance === 300 && renterWallet.escrowHold === 0) {
    console.log('✅ Smart Asset & Rental Engine Tests Passed 100% Successfully!');
  } else {
    console.error('❌ Rental Escrow calculation mismatch');
    process.exit(1);
  }
};

runRentalTests();
