/*!
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-content-block>
 */
(function () {
    angular.module('piwikApp').directive('piwikContentBlock', piwikContentBlock);

    piwikContentBlock.$inject = ['piwik'];

    function piwikContentBlock(piwik){

        var contentTopPosition = null;

        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
                contentTitle: '@',
                feature: '@',
                helpUrl: '@',
                helpText: '@'
            },
            templateUrl: 'plugins/CoreHome/angularjs/content-block/content-block.directive.html?cb=' + piwik.cacheBuster,
            controllerAs: 'contentBlock',
            compile: function (element, attrs) {

                if (attrs.feature === 'true') {
                    attrs.feature = true;
                }

                return function (scope, element, attrs) {
                    var inlineHelp = element.find('[ng-transclude] > .contentHelp');
                    if (inlineHelp.size()) {
                        scope.helpText = inlineHelp.html();
                        inlineHelp.remove();
                    }

                    if (scope.feature && (scope.feature===true || scope.feature ==='true')) {
                        scope.feature = scope.contentTitle;
                    }

                    if (contentTopPosition !== false) {
                        if (contentTopPosition === null) {
                            var $content = $('#content.admin');
                            if ($content.size()) {
                                // cache top position for further content blocks
                                contentTopPosition = $content.offset().top;
                            } else {
                                contentTopPosition = false;
                            }
                        }

                        if (contentTopPosition || contentTopPosition === 0) {
                            var topThis = element.offset().top;
                            if ((topThis - contentTopPosition) < 17) {
                                // we make sure to display the first card with no margin-top to have it on same as line as
                                // navigation
                                element.css('marginTop', '0');
                            }
                        }
                    }

                };
            }
        };
    }
})();