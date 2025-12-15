from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
from typing import List, Dict

EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY")

class AIService:
    def __init__(self):
        self.api_key = EMERGENT_LLM_KEY
    
    async def get_skill_matches(self, user_skills_to_teach: List[str], user_skills_to_learn: List[str], all_users: List[Dict]) -> List[Dict]:
        """Use AI to find best skill exchange matches"""
        try:
            chat = LlmChat(
                api_key=self.api_key,
                session_id="skill-matching",
                system_message="You are a skill matching expert. Analyze user skills and recommend the best matches for skill exchanges."
            ).with_model("openai", "gpt-4o-mini")
            
            prompt = f"""
            User wants to teach: {', '.join(user_skills_to_teach)}
            User wants to learn: {', '.join(user_skills_to_learn)}
            
            Available users and their skills:
            {self._format_users_for_ai(all_users)}
            
            Recommend the top 3 best matches. Return only the user IDs in this format: id1,id2,id3
            """
            
            user_message = UserMessage(text=prompt)
            response = await chat.send_message(user_message)
            
            # Parse response to get user IDs
            recommended_ids = response.strip().split(',')
            return [user for user in all_users if user['id'] in recommended_ids][:3]
        except Exception as e:
            print(f"AI matching error: {e}")
            # Fallback to simple matching
            return all_users[:3]
    
    async def enhance_profile(self, bio: str, skills_to_teach: List[str], skills_to_learn: List[str]) -> Dict[str, any]:
        """Use AI to enhance user profile"""
        try:
            chat = LlmChat(
                api_key=self.api_key,
                session_id="profile-enhancement",
                system_message="You are a profile optimization expert. Help users create compelling profiles for skill exchange platforms."
            ).with_model("openai", "gpt-4o-mini")
            
            prompt = f"""
            Current bio: {bio}
            Skills to teach: {', '.join(skills_to_teach)}
            Skills to learn: {', '.join(skills_to_learn)}
            
            Improve the bio to make it more engaging and professional. Keep it under 150 words.
            Return only the enhanced bio text.
            """
            
            user_message = UserMessage(text=prompt)
            enhanced_bio = await chat.send_message(user_message)
            
            return {
                "enhancedBio": enhanced_bio.strip(),
                "suggestedSkills": []
            }
        except Exception as e:
            print(f"AI enhancement error: {e}")
            return {
                "enhancedBio": bio,
                "suggestedSkills": []
            }
    
    async def chat_assistant(self, message: str, context: str = "") -> str:
        """AI chat assistant for user help"""
        try:
            chat = LlmChat(
                api_key=self.api_key,
                session_id="chat-assistant",
                system_message="You are a helpful AI assistant for SkillSwap, a skill exchange platform. Help users with skill matching, conversation starters, and platform guidance. Be friendly and concise."
            ).with_model("openai", "gpt-4o-mini")
            
            user_message = UserMessage(text=message)
            response = await chat.send_message(user_message)
            
            return response.strip()
        except Exception as e:
            print(f"AI chat error: {e}")
            return "I'm having trouble connecting right now. Please try again later."
    
    def _format_users_for_ai(self, users: List[Dict]) -> str:
        """Format users data for AI processing"""
        formatted = []
        for user in users:
            formatted.append(f"ID: {user['id']}, Name: {user['name']}, Teaches: {', '.join(user.get('skillsToTeach', []))}, Wants to learn: {', '.join(user.get('skillsToLearn', []))}")
        return '\n'.join(formatted)

ai_service = AIService()
