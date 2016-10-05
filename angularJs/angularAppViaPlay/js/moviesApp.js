/*
 * Sep 2016@byazit
 */
var app = angular.module("moviesApp", []);

app.controller("movieController",
        function ($scope, $http) {
            //loading movie
            $scope.clickMovie = function (movie) {
                //console.log(movie);
                //First time load will take titanic-1997
                //When click on page movie it will got new movie name
                $http.get("https://content.viaplay.se/pc-se/film/"+movie)
                        .then(function (response) {
                            //console.log(response.data._embedded['viaplay:blocks']['0']['_embedded']['viaplay:product']);
                            $scope.headerMovie=response.data._embedded['viaplay:blocks']['0']['_embedded']['viaplay:product'];
                            $scope.backgoundPix=response.data._embedded['viaplay:blocks']['0']['_embedded']['viaplay:product']['content']['images']['landscape']['url'];
                            $scope.actors=response.data._embedded['viaplay:blocks']['0']['_embedded']['viaplay:product']['content']['people']['actors'];
                            $scope.directors=response.data._embedded['viaplay:blocks']['0']['_embedded']['viaplay:product']['content']['people']['directors'];
                            $scope.countries=response.data._embedded['viaplay:blocks']['0']['_embedded']['viaplay:product']['content']['production']['country'];
                            $scope.movies = response.data._embedded['viaplay:blocks']['1']['_embedded']['viaplay:products'];
                        })
            }
        });
