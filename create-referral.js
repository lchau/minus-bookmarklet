// minus.com already uses jQuery, so we'll leverage that
// @author: lchau
// 1. Create a minus.com account
// 2. Navigate to the referral link page (top right > invite friends > [1])
// 3. Copy the referral link
// 4. Logout (Sign out)
// 5. Paste/Navigate to referral link page  (Step 3)
// 6. Open FireBug/Google Chrome console
// 7. Paste code [below] and run
var characters = function () {
    var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercase = uppercase.toLowerCase();
    var numbers = "0123456789";

    var characters = [];
    characters.push(uppercase);
    characters.push(lowercase);
    characters.push(numbers);
    characters = characters.join("").split("");
    Object.freeze(characters);

    var random = function () {
        // restrict boundary to C's min/max int
        var min_value = -2147483647;
        var max_value = 2147483647;
        return function (min, max) {
            if (min > max) {
                throw new RangeError("min value '" + min + "' must be lesser than or equal to max value '" + max + "'");
            } else if (min < min_value) {
                throw new RangeError(min + " exceeds minimum value (" + min_value + ")");
            } else if (max > max_value) {
                throw new RangeError(max + " exceeds maximum value (" + max_value + ")");
            } else if (min == max) {
                return max;
            }
            return Math.floor((Math.random() * (max - min + 1)) + min);
        }
    }();
    return {
        get: function () {
            return characters;
        },
        length: characters.length,
        random: function (min, max) {
            var characters = [];
            for (var i = 0; i < random(min, max); i++) {
                var next = random(0, this.length);
                characters.push(this.get()[next]);
            }
            return function () {
                return characters.join("");
            }();
        }
    }
}();

// generic password
var password = "password";
var num_referrals = 50;
for (var i = 0; i < num_referrals; i++) {
    var username = characters.random(10, 20);
    console.log("Registering account (username=" + username + ", password=" + password + ")");
    $.ajax({
        type: "POST",
        url: "http://minus.com/api/login/register", // must not use SSL
        data: $.param({
            email: "", // optional
            password1: password,
            password2: password,
            regname: "", // optional
            username: username
        }),
        success: function () {
            console.log("Account created.");
        }
    });
}
