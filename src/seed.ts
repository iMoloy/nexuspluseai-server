import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/user.model';
import { Asset } from './models/asset.model';
import { GigTask } from './models/gigTask.model';

dotenv.config();

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected!');

    // Get or create a dummy user
    let user = await User.findOne({ email: 'seed@nexuspulse.ai' });
    if (!user) {
      user = await User.create({
        name: 'NexusPulse AI Demo User',
        email: 'seed@nexuspulse.ai',
        password: 'Password123!',
        isVerified: true
      });
    }

    console.log('Clearing existing Assets and Gigs...');
    await Asset.deleteMany({});
    await GigTask.deleteMany({});

    console.log('Inserting Assets...');
    await Asset.insertMany([
      {
        owner: user._id,
        title: 'Tesla Model 3 Performance 2025',
        description: 'Latest Tesla Model 3 Performance for rent.',
        category: 'VEHICLE',
        rentalRate: 120,
        securityDeposit: 250,
        location: 'Dhaka, Bangladesh',
        images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'],
        isAvailable: true
      },
      {
        owner: user._id,
        title: 'BMW M4 Competition Convertible',
        description: 'Sporty BMW M4 Competition.',
        category: 'VEHICLE',
        rentalRate: 250,
        securityDeposit: 500,
        location: 'Gulshan 2, Dhaka',
        images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'],
        isAvailable: true
      },
      {
        owner: user._id,
        title: 'RED V-Raptor 8K Cinema Camera Kit',
        description: 'Professional cinema camera kit.',
        category: 'TECH_EQUIPMENT',
        rentalRate: 180,
        securityDeposit: 400,
        location: 'Gulshan, Dhaka',
        images: ['https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?w=800'],
        isAvailable: true
      },
      {
        owner: user._id,
        title: 'Executive Glassmorphism Co-Working Suite',
        description: 'Modern office space for rent.',
        category: 'WORKSPACE',
        rentalRate: 110,
        securityDeposit: 200,
        location: 'Gulshan 1, Dhaka',
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
        isAvailable: true
      }
    ]);

    console.log('Inserting Gigs...');
    await GigTask.insertMany([
      {
        client: user._id,
        title: 'Design Dark Mode Glassmorphism Dashboard UI',
        description: 'Need a UI/UX designer for our dashboard.',
        category: 'UI/UX Design',
        budget: 350,
        deadline: new Date(Date.now() + 7 * 86400000), // 7 days from now
        status: 'OPEN'
      },
      {
        client: user._id,
        title: 'Integrate Express SSE Stream & TanStack Query',
        description: 'Backend task to integrate SSE.',
        category: 'Web Development',
        budget: 450,
        deadline: new Date(Date.now() + 14 * 86400000),
        status: 'IN_PROGRESS',
        assignedFreelancer: user._id
      },
      {
        client: user._id,
        title: 'Build AI Dispute Mediator Gemini API Agent',
        description: 'AI logic implementation.',
        category: 'AI / Machine Learning',
        budget: 500,
        deadline: new Date(Date.now() + 5 * 86400000),
        status: 'UNDER_REVIEW',
        assignedFreelancer: user._id
      }
    ]);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
