// Mock data for SkillSwap

export const mockUsers = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Passionate web developer and language enthusiast',
    skillsToTeach: ['Web Development', 'JavaScript', 'React'],
    skillsToLearn: ['Spanish', 'Guitar', 'Photography'],
    location: 'San Francisco, CA',
    rating: 4.8,
    completedExchanges: 15
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Food blogger and photography enthusiast',
    skillsToTeach: ['Cooking', 'Food Photography', 'Baking'],
    skillsToLearn: ['Web Development', 'Video Editing', 'Marketing'],
    location: 'New York, NY',
    rating: 4.9,
    completedExchanges: 22
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Freelance designer and creative thinker',
    skillsToTeach: ['UI/UX Design', 'Figma', 'Illustration'],
    skillsToLearn: ['3D Modeling', 'Animation', 'Motion Graphics'],
    location: 'Austin, TX',
    rating: 4.7,
    completedExchanges: 18
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    bio: 'Yoga instructor and wellness coach',
    skillsToTeach: ['Yoga', 'Meditation', 'Nutrition'],
    skillsToLearn: ['Piano', 'French', 'Digital Marketing'],
    location: 'Los Angeles, CA',
    rating: 5.0,
    completedExchanges: 30
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Professional photographer and travel blogger',
    skillsToTeach: ['Photography', 'Lightroom', 'Travel Planning'],
    skillsToLearn: ['Web Development', 'SEO', 'Content Writing'],
    location: 'Seattle, WA',
    rating: 4.6,
    completedExchanges: 12
  }
];

export const mockSkills = [
  'Web Development', 'JavaScript', 'React', 'Python', 'Java',
  'Photography', 'Video Editing', 'Graphic Design', 'UI/UX Design',
  'Spanish', 'French', 'German', 'Mandarin',
  'Guitar', 'Piano', 'Singing', 'Drums',
  'Cooking', 'Baking', 'Nutrition',
  'Yoga', 'Meditation', 'Fitness',
  'Marketing', 'SEO', 'Content Writing', 'Public Speaking',
  '3D Modeling', 'Animation', 'Illustration'
];

export const mockMessages = [
  {
    id: '1',
    conversationId: 'conv1',
    senderId: '2',
    senderName: 'Sarah Miller',
    senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    receiverId: '1',
    message: 'Hi! I saw you want to learn cooking. Would you be interested in exchanging skills?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: '2',
    conversationId: 'conv2',
    senderId: '3',
    senderName: 'Michael Chen',
    senderAvatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    receiverId: '1',
    message: 'Hey! Your React skills look impressive. Want to trade for UI/UX design lessons?',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true
  }
];

export const mockConversations = [
  {
    id: 'conv1',
    participantId: '2',
    participantName: 'Sarah Miller',
    participantAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Hi! I saw you want to learn cooking...',
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 1
  },
  {
    id: 'conv2',
    participantId: '3',
    participantName: 'Michael Chen',
    participantAvatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    lastMessage: 'Hey! Your React skills look impressive...',
    lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
    unreadCount: 0
  }
];

export const mockCurrentUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Passionate web developer and language enthusiast',
  skillsToTeach: ['Web Development', 'JavaScript', 'React'],
  skillsToLearn: ['Spanish', 'Guitar', 'Photography'],
  location: 'San Francisco, CA',
  rating: 4.8,
  completedExchanges: 15
};

export const mockTestimonials = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Web Developer & Spanish Tutor',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: "I learned web development in exchange for teaching Spanish. It's amazing how much you can learn when you're also teaching!"
  },
  {
    id: '2',
    name: 'Sarah Miller',
    role: 'Food Blogger & Photography Enthusiast',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'SkillSwap helped me find a photography mentor while I shared my cooking skills. The perfect win-win!'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Freelance Designer',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    text: 'As a freelancer, I needed to upskill without spending money. SkillSwap was the perfect solution for me.'
  }
];

export const mockStats = [
  { label: 'Active Users', value: '10,000+' },
  { label: 'Skill Exchanges', value: '5,000+' },
  { label: 'Skills Available', value: '200+' },
  { label: 'Satisfaction Rate', value: '98%' }
];
