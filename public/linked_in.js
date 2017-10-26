//Once logged in, wires the auth event handler to OnLinkedInAuth()
function OnLinkedInFrameworkLoad() {
  IN.Event.on(IN, "auth", OnLinkedInAuth);
}
//Reads user details using "me". Passes result to ShowProfileData
function OnLinkedInAuth() {
    IN.API.Profile("me")
      .fields(["firstName", "positions:(company,title,summary,startDate,endDate,isCurrent)"])

    .result(ShowProfileData);
}
//Recieves the profile's parameters and stores them
function ShowProfileData(profiles) {
    var companyArray = ['Ghost Inc'];

    var member;
    var id;
    var firstName;
    var lastName;
    var headline;
    var companyName;
    //Checks that returned values are not empty, if they are create them
    if(profiles.values && profiles.values.length > 0){
        member = profiles.values[0];
        id=member.id;
        firstName=member.firstName;
        lastName=member.lastName;
        headline=member.headline;
        if(member.positions.values && member.positions.values.length > 0){
        companyName=member.positions.values[0].company.name;
         }
    }

    console.log(companyName);

 if(companyArray.includes(companyName)){
    $(function() {
        $('.login-form').removeClass('hide-login')
    })
    } else if(companyName === undefined){
        alert('You are not part of a company on LinkedIn.')
    } else {
    companyArray += companyName;
    console.log(companyArray + 'added!');
    }

}