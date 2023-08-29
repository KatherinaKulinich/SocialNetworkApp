import avatar1 from '@images/avatars/1.png';
import avatar2 from '@images/avatars/2.png';
import avatar3 from '@images/avatars/3.png';
import avatar4 from '@images/avatars/4.png';
import avatar5 from '@images/avatars/5.png';
import avatar6 from '@images/avatars/6.png';
import avatar7 from '@images/avatars/7.png';
import avatar8 from '@images/avatars/8.png';
import dayjs from "dayjs";


const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8]
const dateFormat = 'DD/MM/YYYY';


export const getRandomAvatar = () => {
    let randomNumber = Math.floor(Math.random() * 7) + 1;
    return avatars[randomNumber]
}


export const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];


export const famStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'In a relationship', value: 'In a relationship' },
    { label: 'Married', value: 'Married' },
    { label: 'Engaged', value: 'Engaged' },
    { label: 'Divorced', value: 'Divorced' },
]


export const getUserAge = (year:number, month:number, day:number) => {
    let today = new Date();

    let years = today.getFullYear() - year;
    let partOfYear = (today.getMonth() < month) || (today.getMonth() === month && today.getDate() < day) ? 1 : 0;
    let age = years - partOfYear;

    return age;
}



export const getFormFields = (user:any) => {
    const fields = [
        {
            name: ["userName"],
            value: user.userName ? user.userName : '',
        },
        {
            name: ["userSurname"],
            value: user.userSurname ? user.userSurname : '',
        },
        {
            name: ["userGender"],
            value: user.userGender ? user.userGender : '',
        },
        {
            name: ["userBirthday"],
            value: user.userBirthday && dayjs(`${user.userBirthday.fullDate}`, dateFormat),
        },
        {
            name: ["userFamStatus"],
            value: user.userFamStatus ? user.userFamStatus : '',
        },
        {
            name: ["userCity"],
            value: user.userCity ? user.userCity : '',
        },
        {
            name: ["userCountry"],
            value: user.userCountry ? user.userCountry : '',
        },
        {
            name: ["userInterests"],
            value: user.userInterests ? user.userInterests : ['Coding'],
        },
        {
            name: ["userAbout"],
            value: user.userAbout ? user.userAbout : '',
        },
    ]
    return fields
}


export const listOfHobbies = [
    { value: 'Knitting' },
    { value: 'Sewing' },
    { value: 'Chess' },
    { value: 'Board games' },
    { value: 'Watching movies' },
    { value: 'Candle making' },
    { value: 'Cooking' },
    { value: 'Homebrewing wine or beer' },
    { value: 'Cross stitch' },
    { value: 'Magic' },
    { value: 'Bowling' },
    { value: 'Language learning' },
    { value: 'Calligraphy' },
    { value: 'Meditation' },
    { value: 'Podcasting' },
    { value: 'Singing' },
    { value: 'Dancing' },
    { value: 'Scrapbooking'},
    { value: 'Blogging' },
    { value: 'Carpentry' },
    { value: 'Playing a musical instrument'},
    { value: 'Jewellery making' },
    { value: 'Dominoes' },
    { value: 'Flower arranging' },
    { value: 'Video gaming' },
    { value: 'Home improvements/DIY' },
    { value: 'Reading' },
    { value: 'Nail art' },
    { value: 'Indoor gardening-bonsai trees, miniature herb garden, pot plants' },
    { value: 'Drawing' },
    { value: 'Painting' },
    { value: 'Colouring' },
    { value: 'Astronomy' },
    { value: 'Baking' },
    { value: 'Card games' },
    { value: 'Creative writing' },
    { value: 'DJing' },
    { value: 'Acting/drama' },
    { value: 'Embroidery' },
    { value: 'Furniture building' },
    { value: 'Ice skating' },
    { value: 'Swimming' },
    { value: 'Jigsaw puzzles' },
    { value: 'Journalling' },
    { value: 'Karate' },
    { value: 'Listening to music' },
    { value: 'Model building' },
    { value: 'Origami' },
    { value: 'Photography' },
    { value: 'Table tennis' },
    { value: 'Squash' },
    { value: 'Boxing' },
    { value: 'Wrestling' },
    { value: 'Darts' },
    { value: 'Fencing' },
    { value: 'Gymnastics' },
    { value: 'Laser tag' },
    { value: 'Mahjong' },
    { value: 'Yoga' },
    { value: 'Weight training' },
    { value: 'Snooker' },
    { value: 'Pool' },
    { value: 'Collecting' },
    { value: 'Archery' },
    { value: 'Volleyball' },
    { value: 'Car racing' },
    { value: 'Breakdancing' },
    { value: 'Golf' },
    { value: 'Hockey' },
    { value: 'Skateboarding' },
    { value: 'Water polo' },
    { value: 'Backpacking' },
    { value: 'Football/soccer' },
    { value: 'Badminton' },
    { value: 'Cheerleading' },
    { value: 'Tennis' },
    { value: 'Baseball' },
    { value: 'Running' },
    { value: 'Hiking' },
    { value: 'Basketball' },
    { value: 'Netball' },
    { value: 'Horse riding' },
    { value: 'Hunting' },
    { value: 'Skiing' },
    { value: 'Snowboarding' },
    { value: 'Surfing' },
    { value: 'Birdwatching' },
    { value: 'Beekeeping' },
    { value: 'Cycling' },
    { value: 'Camping' },
    { value: 'Caving' },
    { value: 'Boating' },
    { value: 'Fishing' },
    { value: 'Gardening'},
    { value: 'Canoeing'},
    { value: 'Flying' },
    { value: 'Handball' },
    { value: 'Skating' },
    { value: 'Kite flying' },
    { value: 'Martial arts' },
    { value: 'Lacrosse' },
    { value: 'Climbing' },
    { value: 'Metal detecting' },
    { value: 'Sunbathing' },
    { value: 'Outdoor swimming' },
    { value: 'Parkour' },
    { value: 'Rugby' },
    { value: 'Cricket' },
    { value: 'River rafting' },
    { value: 'Polo' },
    { value: 'Sandcastle building' },
    { value: 'Scuba diving' },
    { value: 'Snorkelling' },
    { value: 'Shooting' },
    { value: 'Skydiving' },
    { value: 'Shopping' },
    { value: 'Walking' },
    { value: 'Coding' },
    { value: 'Jogging' },
]