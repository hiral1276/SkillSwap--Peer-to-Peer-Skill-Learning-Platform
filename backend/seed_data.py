import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path
from models import User
from auth import get_password_hash

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if users already exist
    count = await db.users.count_documents({})
    if count > 0:
        print(f"Database already has {count} users. Skipping seed.")
        return
    
    # Create demo users
    demo_users = [
        User(
            name="Sarah Miller",
            email="sarah@example.com",
            password=get_password_hash("password123"),
            avatar="https://randomuser.me/api/portraits/women/44.jpg",
            bio="Food blogger and photography enthusiast with a passion for culinary arts",
            location="New York, NY",
            skillsToTeach=["Cooking", "Food Photography", "Baking"],
            skillsToLearn=["Web Development", "Video Editing", "Marketing"],
            rating=4.9,
            completedExchanges=22
        ),
        User(
            name="Michael Chen",
            email="michael@example.com",
            password=get_password_hash("password123"),
            avatar="https://randomuser.me/api/portraits/men/75.jpg",
            bio="Freelance designer and creative thinker specializing in UI/UX",
            location="Austin, TX",
            skillsToTeach=["UI/UX Design", "Figma", "Illustration"],
            skillsToLearn=["3D Modeling", "Animation", "Motion Graphics"],
            rating=4.7,
            completedExchanges=18
        ),
        User(
            name="Emma Davis",
            email="emma@example.com",
            password=get_password_hash("password123"),
            avatar="https://randomuser.me/api/portraits/women/65.jpg",
            bio="Yoga instructor and wellness coach helping people find balance",
            location="Los Angeles, CA",
            skillsToTeach=["Yoga", "Meditation", "Nutrition"],
            skillsToLearn=["Piano", "French", "Digital Marketing"],
            rating=5.0,
            completedExchanges=30
        ),
        User(
            name="David Wilson",
            email="david@example.com",
            password=get_password_hash("password123"),
            avatar="https://randomuser.me/api/portraits/men/22.jpg",
            bio="Professional photographer and travel blogger capturing moments",
            location="Seattle, WA",
            skillsToTeach=["Photography", "Lightroom", "Travel Planning"],
            skillsToLearn=["Web Development", "SEO", "Content Writing"],
            rating=4.6,
            completedExchanges=12
        ),
        User(
            name="Jessica Lee",
            email="jessica@example.com",
            password=get_password_hash("password123"),
            avatar="https://randomuser.me/api/portraits/women/32.jpg",
            bio="Marketing expert and social media strategist",
            location="Chicago, IL",
            skillsToTeach=["Digital Marketing", "SEO", "Social Media"],
            skillsToLearn=["Graphic Design", "Photography", "Spanish"],
            rating=4.8,
            completedExchanges=25
        )
    ]
    
    for user in demo_users:
        await db.users.insert_one(user.dict())
    
    print(f"✓ Seeded database with {len(demo_users)} demo users")
    print("  Email: sarah@example.com / michael@example.com / emma@example.com")
    print("  Password: password123")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
