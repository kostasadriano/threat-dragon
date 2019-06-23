﻿'use strict';

describe('webreport controller', function () {
    
    var $scope;
    var $controller;
    var $httpBackend;
    var $location;
    var common;
    
    beforeEach(function () {
        
        angular.mock.module('app')
        
        angular.mock.inject(function ($rootScope, _$controller_, _$location_, _$httpBackend_, _common_) {
            $scope = $rootScope.$new();
            $controller = _$controller_;
            $location = _$location_;
            common= _common_
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET().respond();
        });
    });
    
    describe('initialisation tests', function () {

        beforeEach(function() {
            $controller('webreport as vm', { $scope: $scope });
            $scope.$apply();
        });

        it('should be defined', function () {
            expect($scope.vm).toBeDefined();
        });
        
        it('should have "Threat Model Report" for its title', function () {
            expect($scope.vm.title).toEqual('Threat Model Report');
        });

    });

    describe('viewmodel tests', function () {

        it('should set the loaded flag', function () {
            
            $controller('webreport as vm', { $scope: $scope });
            $scope.$apply();
            $scope.vm.loaded = false;
            $scope.vm.onLoaded();
            expect($scope.vm.loaded).toEqual(true);

        });

        it('should log an error', function() {

            var testError = new Error('test error');
            var testErrorMessage = 'message';
            testError.data = { message: testErrorMessage };
            var errorLogger = jasmine.createSpy('errorLogger');
            spyOn(common.logger, 'getLogFn').and.returnValue(errorLogger);
            $controller('webreport as vm', { $scope: $scope });
            $scope.$apply();

            $scope.vm.error = null;
            $scope.vm.onError(testError);
            expect($scope.vm.error).toEqual(testError);
            expect(errorLogger).toHaveBeenCalled();
            expect(errorLogger.calls.argsFor(1)).toEqual([testErrorMessage]);

        });
    });
});