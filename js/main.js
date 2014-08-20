

window._skel_config = {
			prefix: 'css/style',
			preloadStyleSheets: true,
			resetCSS: true,
			boxModel: 'border',
			grid: { gutters: 30 },
			breakpoints: {
				wide: { range: '1200-', containers: 1140, grid: { gutters: 50 } },
				narrow: { range: '481-1199', containers: 960 },
				mobile: { range: '-480', containers: 'fluid', lockViewport: true, grid: { collapse: true } }
			}
		}
		
		
$(document).ready(function() {
    var display_license_holders = function(e){
        e.preventDefault();
        $("#backgroundmusic").hide();
        $("#driving_lessons").hide();
        var url = $(this).attr("href");
        $.get(url, function(data){
            $("#instruction").html(data);
        });
    }

    var choose_background_music = function(e){
        e.preventDefault();
        $("#backgroundmusic").show();
        $("#instruction").empty();
        $("#driving_lessons").hide();
    }

    var display_driving_lessons = function(e){
        e.preventDefault();
        $("#backgroundmusic").hide();
        $("#instruction").empty();
        $("#driving_lessons").show();
    }
	
	
	var start_test = function(e){
    e.preventDefault();
    $("#instruction").empty();
    $("#button").empty();
    start_questions();
    }
    var start_questions = function(){
        $("#backgroundmusic").empty();
        var questions = [
            { "img src":'img1.jpg',"answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 2: The maximum permissible speed for cars or motorcycles on motorways M2 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 3: The maximum permissible speed for cars or motorcycles on motorways M3 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 4: The maximum permissible speed for cars or motorcycles on motorways M4 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 5: The maximum permissible speed for cars or motorcycles on motorways M5 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 6: The maximum permissible speed for cars or motorcycles on motorways M6 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 7: The maximum permissible speed for cars or motorcycles on motorways M7 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 8: The maximum permissible speed for cars or motorcycles on motorways M8 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 9: The maximum permissible speed for cars or motorcycles on motorways M9 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" },
            { "text":"Question 10: The maximum permissible speed for cars or motorcycles on motorways M10 is?", "answers":["60km/h", "80km/h", "100km/h", "120km/h"], "correct":"120km/h" }
        ];

        var display_content = function(e){
            e.preventDefault();
            $("#question").empty();
            $("#message").empty();
            var url = $(this).attr("href");
            $.get(url, function(data){
                $("#new").html(data);
                $("#new form").on("submit", monitor_form);
            });
        }

        var monitor_form = function(e){
            e.preventDefault();
            $("#score").empty();
            $("#new").empty();
            message = "Thank you,you can collect your license after 3 working days, please <a href='#'>click here</a> to view location";
            $("#message").html(message);

            var data = {};
            $(this).find("input, textarea").each(function () {
                var name = $(this).attr("name");
                var value = $(this).val();
                data[name] = value;
                data["tester[score]"] = score;
            });

            var url = $(this).attr("action");

            $.ajax({
                url:url,
                method:$(this).attr("method"),
                data:data,
                complete:function () {
                    $.get(url, display_content);
                }
            });
        }

        var index = 0;
        var score = 0;
        var message;
        var display_question = (function () {
            var question = questions[index];
            $("#question").text(question.text);
            $("#answers").empty();
            for (var i in question.answers) {
                var answer = question.answers[i];
                $("#answers").append("<li>" + answer + "</li>");
            }
            $("#answers li").on("click", validate_answer);
        });
		
        var validate_answer = (function () {
            undisplay_error();
            if ($(this).text().toLowerCase() == questions[index].correct.toLowerCase()) {
            index++;
            score++;
            if (questions.length > index) {
                display_question();
                countdown = max_countdown;
            } else {
            $("#question").text("you have finished the test!");
            $("#answers").empty();
            clearInterval(countdown_interval);
            $("#countdown").empty();
            display_score();
            display_message();
            }
        } else {
        index++;
        if (questions.length > index) {
            display_question();
            countdown = max_countdown;
         } else {
            $("#question").text("you have finished the test.");
            $("#answers").empty();
            clearInterval(countdown_interval);
            $("#countdown").empty();
            display_score();
            display_message();
         }
        }
        });

    var display_error = (function () {
        $("#error").text("You run out of the time, please be careful!!!");
    });
    var undisplay_error = (function () {
        $("#error").empty();
    });
    var display_score = (function () {
        $("#score").text("Your score is ");
        $("#score").append(score);
    });
	
    var display_message = (function () {
        if (score > 5){
            message  = "Congratulations, you have passed the test. " +
			"Please <a href='/testers/new'>click here</a> to fill your details.";
        $("#message").html(message);
        $("#message a").on("click", display_content);
    }else{ message = "Sorry, you failed, good luck next time.";
        $("#message").text(message);}
    });
	
    var max_countdown = 10;
    var countdown = max_countdown;
    var display_countdown = (function () {
        $("#countdown").text("Time remaining: ");
        $("#countdown").append(countdown);
    });
    var countdown_interval = setInterval(function () {
        display_countdown();
        countdown--;
    if (countdown < 0) {
        display_error();
        index++;
        countdown = max_countdown;
        if (questions.length > index) {
            display_question();

        } else {
            undisplay_error();
            $("#question").text("you have finished the test.");
            $("#answers").empty();
            clearInterval(countdown_interval);
            $("#countdown").empty();
            display_score();
            display_message();
        }
    }
    }, 1000);
	
    display_question();
}



$("#button1").on("click", start_test);
$("#button2 a").on("click", display_license_holders);
$("#button3").on("click", choose_background_music);
$("#button4").on("click", display_driving_lessons);
$("#audio1")[0].play();

});	


