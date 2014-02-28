var jokegroups = [
    {"id": 1, "group" : "Animal Jokes", "ref" : "animal"},
    {"id": 2, "group" : "Blonde Jokes", "ref" : "blonde"},
    {"id": 3, "group" : "Country Jokes", "ref" : "country"},
    {"id": 4, "group" : "Dirty Jokes", "ref" : "dirty"},
    {"id": 5, "group" : "Doctor Jokes", "ref" : "doctor"},
    {"id": 6, "group" : "Little Johnny Jokes", "ref" : "johnny"},
    {"id": 7, "group" : "Money Jokes", "ref" : "money"}
],
    
    max = 2,

    jokes_list = {
    "animal" : [
        "Q. Why did the ant fall off the toilet seat? \nA. Because he was pissed off!",
        "Why does a blond dog have lumps on his head? \nFrom chasing parked cars!",
        "Q: What did the bird say after his cage fell apart? \nA: \"Cheap, cheap!\"",
        "How do you know that carrots are good for your eyesight? \nHave YOU ever seen a rabbit with glasses?",
    ],
    "blonde" : [
        "A blonde rings up an airline. She asks, \"How long are your flights from America to England?\"\nThe woman on the other end of the phone says, \"Just a minute...\"\nThe blonde says, \"Thanks!\" and hangs up the phone.",
        "What did the blonde say when someone blew in her ear?\nThanks for the refill."
    ],
    "country" : [
        "Why do blondes have one more brain cell than cows? \nSo when you pull on a blonde's tit, she doesn't s**t on the floor.",
        "Q: Why are there hardly any dental professionals in Arkansas?\nA: Because it takes 35 patients to make a full set of teeth."
    ],
    "dirty" : [
        "What do you get when you put 50 lawyers in a room with 50 lesbians? \nOne hundred people who don't do dick.",
        "I asked my Grandma if she ever tried 69. And she said, “No, but I have done 53 -- that's all the sailors I could screw in one night.”"
    ],
    "doctor" : [
        "A lawyer was just waking up from anesthesia after surgery, and his wife was sitting by his side. His eyes fluttered open and he said, \"You're beautiful!\" and then he fell asleep again. His wife had never heard him say that so she stayed by his side.\nA couple of minutes later, his eyes fluttered open and he said, \"You're cute!\" Well, the wife was dissapointed because instead of \"beautiful,\" it was \"cute.\" She asked, \"What happened to 'beautiful'?\" His reply was \"The drugs are wearing off!\"",
    "A blonde has sharp pains in her side. The doctor examines her and says, \"You have acute appendicitis.\"\nThe blonde says, \"That's sweet, doc, but I came here to get medical help.\""
    ],
    "johnny" : [
        "Johnny was playing outside when he really had to go to the bathroom."
    ],
    "money" : [
        "A crook mistakenly made a counterfeit $8 bill instead of a $10 bill. He decided to try it out anyway.\nHe went to the teller at the local bank and asked for change.\nThe teller looked at the $8 bill and gave the crook two $4 bills as change.",
    "Q: What is the only way to keep your money from the casinos in Las Vegas?\nA: When you get off the plane, walk into the propellers."
    ]
}

var jokes = angular.module("Jokes", ["ui.router"]);

jokes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    'use strict';
    
    $urlRouterProvider.otherwise('home');
    
    $stateProvider
        .state('home', {
            url:            '/home',
            templateUrl:    'views/home.html',
            controller:     'JokesCtrl'
        })
        .state('about', {
            url:            '/about',
            templateUrl:    'views/about.html',
            controller:     'AboutCtrl'
        })
        .state('joke', {
            abstract:   true,
            url:        '/joke',
            template:   '<div ui-view></div>'
        })
        .state('joke.details', {
            url:    '/{jokeId:[0-9]{1,4}}',
            views: {
                '': {
                    controller:     'DetailsCtrl',
                    templateUrl:       "views/details.html"
                }
            }
        });
}]);

jokes.controller('MenuCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.show_menu = false;
    
    $scope.toggleMenu = function () {
        $scope.show_menu = !$scope.show_menu;
        
        var menu = document.getElementById("menu");
        if ($scope.show_menu) {
            menu.removeAttribute("class");
            menu.setAttribute("class", "menu nav-show");
        } else {
            menu.removeAttribute("class");
            menu.setAttribute("class", "menu nav-collapse");
        }
    };
    
    $scope.navigate = function (url) {
        $state.go(url);
    };
}]);

jokes.controller('JokesCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.jokestype = [];
    $scope.jokestype = jokegroups;
    
    $scope.setJokes = function (id) {
        $state.go("joke.details", {jokeId: id});
    };
}]);

jokes.controller('DetailsCtrl', ['$scope', '$state', function ($scope, $state) {
    console.log("In details");
    var id  = $state.params.jokeId,
        ref = jokegroups[id - 1].ref,
        rand;
    
    $scope.joke_item = "";
    
    $scope.group_jokes = [];
    if (ref === "animal") {
        $scope.group_jokes = jokes_list.animal;
    } else if (ref === "blonde") {
        $scope.group_jokes = jokes_list.blonde;
    } else if (ref === "country") {
        $scope.group_jokes = jokes_list.country;
    } else if (ref === "dirty") {
        $scope.group_jokes = jokes_list.dirty;
    } else if (ref === "doctor") {
        $scope.group_jokes = jokes_list.doctor;
    } else if (ref === "johnny") {
        $scope.group_jokes = jokes_list.johnny;
    } else if (ref === "money") {
        $scope.group_jokes = jokes_list.money;
    }
    
    function init() {
        rand = Math.floor((Math.random() * 7) / 2);
        setJoke(rand);
    }
    function setJoke(random) {
        $scope.joke_item = $scope.group_jokes[random];
        console.log($scope.joke_item);
    }
    init();
    
    $scope.next = function () {
        rand++;
        if (rand < max) {
            setJoke(rand);
        } else {
            rand = 0;
            setJoke(rand);
        }
    };
    
    $scope.previous = function () {
        rand--;
        if (rand >= 0) {
            setJoke(rand);
        } else {
            rand = max - 1;
            setJoke(rand);
        }
    };
}]);

jokes.controller('AboutCtrl', ['$scope', function () {
    
}]);