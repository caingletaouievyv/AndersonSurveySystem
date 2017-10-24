﻿(function () {
    'use strict';

    angular
        .module('App')
        .controller('QuestionResultController', QuestionResultController);

    QuestionResultController.$inject = ['QuestionResultService'];

    function QuestionResultController(QuestionResultService) {
        var vm = this;
        //object
        vm.Options;
        vm.QuestionResultFilter = {
            From: new Date(moment().add(-1, 'months')),
            To:new Date(moment()),
            SurveyId: 1
        };
        //object array
        vm.Colors = [];
        vm.QuestionResults = [];
        vm.Rate = [];
        vm.Surveys = [];

        //declared functions
        vm.Initialise = Initialise;
        vm.Read = Read;

        //public read
        function Initialise() {
            vm.Surveys = ['Survey'];
            vm.Colors = ['#B8D0DE', '#9FC2D6', '#86B4CF', '#73A2BD', '#6792AB'];
            vm.Options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 10
                        }
                    }]
                }
            }
            Read();
        }

        function Read() {
            var questionResultFilter = angular.copy(vm.QuestionResultFilter);
            questionResultFilter.From = moment(questionResultFilter.From).format('YYYY-MM-DD');
            questionResultFilter.To = moment(questionResultFilter.To).format('YYYY-MM-DD');
            QuestionResultService.Read(questionResultFilter)
                .then(function (response) {
                    vm.QuestionResults = response.data;

                    vm.Rate = vm.QuestionResults.map(function (a) { return a.Rate; });
                    vm.Number = vm.QuestionResults.map(function (a) { return a.Number; });

                    
                })
                .catch(function (data, status) {
                });
        }

    }
})();