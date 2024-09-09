permit(
  principal == DeathStarData::User::"User",
  action in [DeathStarData::Action::"SearchPlanets"],
  resource
) when {
  true
};