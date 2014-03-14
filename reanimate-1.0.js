 /*!
 * reanimate.js Copyright © 2014 guest271314 http://guest271314.com
 * License: BSD http://www.opensource.org/licenses/BSD-2-Clause
 * Reference : https://stackoverflow.com/questions/22080548/pausing-css-animation-with-javascript-and-also-jumping-to-a-specific-place-in-th
 * Depends: jQuery http://jquery.com
 * Created : 2014-02-27
 * Updated: 2014-03-02
 * Version: 1.0
 * Usage: `← : left-arrow : js animations` `↑ up-arrow : pause all animations`
 * Usage, cont.: `→ right-arow : play css animations`
 *******************************************************************************
Copyright © 2014, guest271314
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*******************************************************************************/

$(document).ready(function() {

    (function reanimate(el, r, p, runner, pauser, pauseAll) {

        var _state = function() {
            $.when(
            $("#animated").data("states", {"fxq": "animated!","cssAnimationState": (el.style.WebkitAnimationPlayState || el.style.animationPlayState),"jsAnimationState": $("#animated").queue("fx")[0]}))
            .done(function(status) {
                return status.data("states")
            });

            return String("css animation state: " + (el.style.WebkitAnimationPlayState || el.style.animationPlayState) + "&nbsp; js animation state: " + $("#animated").queue("fx")[0])
        };

        var runner = function() {
            el.style.animationPlayState = "running";
            el.style.WebkitAnimationPlayState = "running";
            return $("data").html(_state())
        };

        var pauser = function() {
            el.style.animationPlayState = "paused";
            el.style.WebkitAnimationPlayState = "paused";
            $("#animated:animated, #animated *").finish().queue("fx", []);
            return $("data").html(_state())

        };

        $("button:last").on("click", pauser);
        $("button:first").on("click", runner);

        function player(e, pause, play, pauseAll) {

            /*!
            //  settings
            */
            var pauseAll = (undefined || 38); /* `up-arrow` : `pauseAll` */
            var pause = (undefined || 37); /* `left-arrow` : `paused` */
            var play = (undefined || 39); /* `right-arrow` : `running` */

            if (e.which === play) {
                e.preventDefault();
                runner();
                $("data").html(_state())
            };
            /*!
            //  js (jquery) animations (with optional css transitions,
            //  or animations) at `paused` css animations
            */
            if (e.which === pause) {
                e.preventDefault();
                $.when(
                $('#animated')
                .animate({
                    width: "+=400px",
                    height: "+=400px",
                    borderRadius: "+=50%",
                    fontSize: "+=22px"
                },
                {
                    duration: 3500,
                    easing: "swing",
                    start: $('#animated').css({"transition": "background 3500ms linear, box-shadow 3500ms linear","-webkit-transition": "background 3500ms linear, -webkit-box-shadow 3500ms linear","-moz-transition": "background 3500ms linear, -moz-box-shadow 3500ms linear","background": "yellow","box-shadow": "0.25em 0.25em 0.25em #f57900","-webkit-transform-style": "preserve-3d","-webkit-transform": "rotateX(180deg) rotateZ(45deg)","-moz-transform-style": "preserve-3d","-transform": "rotateX(180deg) rotateZ(45deg)","-webkit-backface-visibility": "visible","-moz-backface-visibility": "visible"}).html(function() {
                        return $("<em>" + $('#animated').data("states").fxq + "</em>").css({"display": "block","position": "relative","top": "25%","left": "0%","transform": "rototeX(33deg)","text-shadow": "2px 2px 2px orange"}).fadeIn(2000, function() {
                            _state()
                        })
                    })
                })
                .animate({width: "100px",height: "100px",
                    borderTopLeftRadius: "0%",
                    borderTopRightRadius: "0%",
                    borderBottomLeftRadius: "0%",
                    borderBottomRightRadius: "0%",
                    fontSize: "10px"}, {
                    duration: 3500,
                    easing: "linear",
                    done: function() {
                        $('#animated').css({"transition": "background 3500ms ease-out, box-shadow 2500ms ease-out","-webkit-transition": "background 3500ms, -webkit-box-shadow 3500ms ease-out","-moz-transition": "background 3500ms ease-out, -moz-box-shadow 3500ms ease-out","background": "red","box-shadow": "0.0em 0.0em 0.0em transparent","-webkit-transform": "rotateX(0deg) rotateY(0deg) rotateZ(0deg)","transform": "rotateX(0deg) rotateY(0deg) rotateZ(0deg)","-moz-backface-visibility": "hidden","-webkit-backface-visibility": "hidden"}).children("em").fadeOut(2000, function() {
                            _state()
                        }).promise().done(function() {
                            $("em").finish().detach()
                        })
                    }
                }), $("data").html(_state())).promise().done(function() {
                    runner();
                }).always(function() {_state()})
            };
            /*!
            //  pause all css and js animations
            */
            if (e.which === pauseAll) {
                e.preventDefault();
                (function() {
                    var _check = ($("#animated").queue("fx")[0] != undefined ? $("#animated:animated, #animated *").finish() && pauser() : ((el.style.animationPlayState === undefined ? el.style.WebkitAnimationPlayState : el.style.animationPlayState) === "running" ? pauser() : runner()))

                    return $.when(_check, $("data").html(_state()))

                }())
            };
        };
        $(window).on("keydown", player);
        
        return $("data").html(_state())
    })($("#animated").get(0), "running", "paused")
})
