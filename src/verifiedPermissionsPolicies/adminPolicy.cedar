permit(
  principal == DeathStarData::User::"Admin",
  action in [DeathStarData::Action::"ListPeople",DeathStarData::Action::"SearchPerson",DeathStarData::Action::"SearchPlanets"],
  resource
) when {
  true
};