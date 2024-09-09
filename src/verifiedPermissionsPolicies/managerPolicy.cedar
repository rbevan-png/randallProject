permit(
  principal == DeathStarData::User::"Manager",
  action in [DeathStarData::Action::"SearchPlanets",DeathStarData::Action::"ListPeople"],
  resource
) when {
  true
};