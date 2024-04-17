const localeSettings = {
    monthNames: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    monthNamesShort: [
      "Jan.", "Feb.", "March", "April", "May", "June",
      "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
    ],
    dayNames: [
      "Sunday", "Monday", "Tuesday", "Wednesday", 
      "Thursday", "Friday", "Saturday"
    ],
    dayNamesShort: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
    today: "Today"
};

const locales = {
    "en-GB": localeSettings,
    "en-US": localeSettings,
    "no": {
        monthNames: [
            "Januar", "Februar", "Mars", "April", "Mai", "Juni", 
            "Juli", "August", "September", "Oktober", "November", "Desember"
        ],
        monthNamesShort: [
            "Jan.", "Feb.", "Mars", "April", "Mai", "Juni",
            "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Des."
        ],
        dayNames: [
            "Søndag", "Mandag", "Tirsdag", "Onsdag", 
            "Torsdag", "Fredag", "Lørdag"
        ],
        dayNamesShort: ["Søn.", "Man.", "Tir.", "Ons.", "Tor.", "Fre.", "Lør."],
        today: "I dag"
    },
    "fi": {
        monthNames: [
            "Narâk Ghâsh", "Narâk Durb", "Ghash Ghâsh", "Ghash Durb", 
            "Lûk Ghâsh", "Lûk Durb", "Snaga Lûk Ghâsh", "Snaga Lûk Durb", 
            "Snaga Narâk Ghâsh", "Snaga Narâk Durb", "Ûzg Ghâsh", "Ûzg Durb"
        ],
        monthNamesShort: [
            "Narâk G.", "Narâk D.", "Ghash G.", "Ghash D.",
            "Lûk G.", "Lûk D.", "Snaga L. G.", "Snaga L. D.",
            "Snaga N. G.", "Snaga N. D.", "Ûzg G.", "Ûzg D."
        ],
        dayNames: [
            "Ûzgûrz", "Narâkûrz", "Ghashûrz", "Lûkûrz", 
            "Snagaûrz", "Rûkûrz", "Thrakûrz"
        ],
        dayNamesShort: ["Ûzg.", "Nar.", "Gha.", "Lûk.", "Sna.", "Rûk.", "Thr."],
        today: "Snaga"
    }
};

export default locales;