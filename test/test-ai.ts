import { generateTaskDescription, recommendFreelancersOrAssets, analyzeDispute } from '../src/services/ai.service';

const runAITests = async () => {
  console.log('=== Starting AI Integration & Smart Matchmaker Unit Tests ===');

  // 1. AI Task Generation Test
  const taskPrompt = 'Build a responsive React Kanban board component with drag and drop';
  const taskData = await generateTaskDescription(taskPrompt, 'WEB_DEVELOPMENT');
  console.log('✓ AI Task Generator Response:');
  console.log('   - Generated Title:', taskData.title);
  console.log('   - Suggested Budget: $' + taskData.suggestedBudget);
  console.log('   - Estimated Days:', taskData.estimatedDays);

  // 2. AI Matchmaker Ranking Test
  const mockFreelancers = [
    { name: 'Sharif Ahmed', skills: ['React', 'TypeScript', 'Tailwind'] },
    { name: 'Rahim Chowdhury', skills: ['Python', 'Django'] }
  ];
  const ranked = await recommendFreelancersOrAssets('React Kanban Developer', mockFreelancers);
  console.log('✓ AI Matchmaker Recommendation Result:');
  console.log('   - Top Ranked Candidate:', ranked[0].name, `(Match Score: ${ranked[0].matchScore}/100)`);

  // 3. AI Dispute Mediator Test
  const disputeResult = await analyzeDispute(
    'Build Fullstack Next.js App',
    'Client: "The layout looks great, but minor API fixes needed."',
    'Submission link: https://github.com/test/demo'
  );
  console.log('✓ AI Dispute Mediator Recommendation:');
  console.log(`   - Freelancer Share: ${disputeResult.freelancerSharePercent}%, Client Refund: ${disputeResult.clientRefundPercent}%`);
  console.log('   - Rationale:', disputeResult.summaryRationale);

  if (taskData.suggestedBudget > 0 && ranked.length > 0 && disputeResult.freelancerSharePercent > 0) {
    console.log('✅ AI Integration & Smart Matchmaking Tests Passed 100% Successfully!');
  } else {
    console.error('❌ AI service test failed');
    process.exit(1);
  }
};

runAITests();
