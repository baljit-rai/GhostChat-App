//Once logged in, wires the auth event handler to OnLinkedInAuth()
function OnLinkedInFrameworkLoad() {
  IN.Event.on(IN, "auth", OnLinkedInAuth);
}
//Reads user details using "me". Passes result to ShowProfileData
function OnLinkedInAuth() {
    IN.API.Profile("me").result(ShowProfileData);
}
//Recieves the profile's parameters and stores them
function ShowProfileData(profiles) {
    var member = profiles.values[0];
    var id=member.id;
    var firstName=member.firstName;
    var lastName=member.lastName;
    var photo=member.pictureUrl;
    var headline=member.headline;

    //use information captured above
}
