function capFirstLetter(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function hideDiv(sty) {
    document.getElementById("logOut").style.display = sty;
    if (sty == 'none') {
        loggedIn = true;
    }
}

function checkUserBase(email) {
    /*
      var email = profile.getEmail();
      console.log(name);*/

    var encrypted = btoa(CryptoJS.AES.encrypt(email, "projectAthena"));
    var decrypted = CryptoJS.AES.decrypt(atob(encrypted), "projectAthena");
    var str = decrypted.toString(CryptoJS.enc.Hex);

    console.log(encrypted);
    console.log(decrypted);
    console.log(str);
    hasAccount(str);
    var foo = 'schedule';
    hasSchedule(str);
    getClasses(str);
    console.log("checked");
    /*
    ref.child(foo).once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                console.log("key: " + key);
                console.log("value: " + childData);
                console.log(childSnapshot);
                childSnapshot.forEach(function(innerChild) {
                    console.log(innerChild.getKey());
                    console.log(innerChild.val());
                })
            });
        });*/
}

function getClasses(acc) {
    ref.child('schedule').once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                console.log(key + " and " + acc);
                if (key == acc) {
                    console.log(acc + " is = to " + key);
                    childSnapshot.forEach(function(innerChild) {
                        console.log(innerChild.getKey());
                        console.log(innerChild.val());
                    });
                    return true;
                } else {
                    console.log("not equal");
                }
                /*
                                        // childData will be the actual contents of the child
                                        var childData = childSnapshot.val();
                                        console.log("key: " + key);
                                        console.log("value: " + childData);
                                        console.log(childSnapshot);
                                        childSnapshot.forEach(function(innerChild) {
                                            console.log(innerChild.getKey());
                                            console.log(innerChild.val());
                                        });*/
            });
        });
}

function createUser(keyID, profile) {
    var foo = {};
    foo[keyID] = {
        'firstname': profile.getGivenName(),
        'lastname': profile.getFamilyName(),
        'email': profile.getEmail()
    };
    /*
    ref.push({
        'userbase': foo
    });
    console.log("added");*/
    ref.child('userbase').update(foo);
    //ref.update({ third: 'Ada', fourth: 'Lovelace' });
}

function hasAccount(acc) {
    ref.child('userbase').once("value")
        .then(function(snapshot) {
            var key = snapshot.key;
            if (snapshot.hasChild(acc) == false) {
                console.log("account doesnt exist, create new one");
                createUser(acc);
            } else {
                console.log("account exists, dont create anything");
            }
        });
}

function hasSchedule(acc) {
    ref.child('schedule').once("value")
        .then(function(snapshot) {
            var key = snapshot.key; // "ada"
            if (snapshot.hasChild(acc) == false) {
                console.log("schedule doesnt exist, create new one");
                createSchedule(acc);
            } else {
                console.log("schedule exists, dont create anything");
            }
        });
}

function initSchedule(keyID) {
    var foo = {};
    var c1 = 'English 10th';
    var c2 = 'World';
    var c3 = 'Trig';
    foo[keyID] = {
        1: c1,
        2: c2,
        3: c3
    };

    ref.update({
        schedule: foo
    });
}

function createSchedule(keyID) {
    var foo = {};
    var c1 = 'English 11th';
    foo[keyID] = {
        1: c1,
    };

    ref.child('schedule').update(foo);
    console.log(foo);
}
