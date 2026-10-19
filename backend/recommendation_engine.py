def generate_recommendation(skill_result, burnout_result):
    match = skill_result["match_percentage"]
    burnout = burnout_result["burnout_risk"]

    if burnout == "HIGH":
        message = f"High burnout detected. Focus only on {skill_result['priority_skills'][0]} and improve sleep."
    elif burnout == "MODERATE" and match < 50:
        message = "Skill gap exists but avoid overload. Study 1–2 focused hours daily."
    elif burnout == "LOW" and match < 50:
        message = "Good mental condition. Increase learning intensity and focus on missing core skills."
    elif match >= 75:
        message = "Strong alignment with target role. Maintain consistency and refine advanced skills."
    else:
        message = "Maintain balanced progress and steady improvement."

    resources = [
        {
            "skill": item["skill"],
            "link": item["learning_link"]
        }
        for item in skill_result.get("missing_skills", [])[:4]
    ]

    return {
        "message": message,
        "resources": resources
    }