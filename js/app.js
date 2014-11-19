angular.module('StaffingUI', [
    'ngRoute'
]).run(function(UserFactory, TitleFactory, SkillFactory) {
    UserFactory.fetch();
    TitleFactory.fetch();
    SkillFactory.fetch();
});