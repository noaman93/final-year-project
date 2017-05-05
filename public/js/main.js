//alert("kKKKKKKKKKK");

//=========================
//    index.ejs
//=========================

$( document ).ready(function() {
//    alert("Success");

        $('#radio4').click(function (event) {
        $('#propertyTypeIndex').addClass('none');
        $('#landAreaIndex').removeClass('none');
        });

        $('.plotIndex').click(function (event){
            $('#propertyTypeIndex').removeClass('none');
            $('#landAreaIndex').addClass('none');
        });
        
        $('.hostelIndex').click(function (event){
            $('#propertyTypeIndex').addClass('none');
            $('#landAreaIndex').addClass('none');
        });

        $('#radio5').click(function (event) {
        $('#rentMonthly').removeClass('none');
        $('#maxPrice').addClass('none');
        });

        $('.plotIndex, .realPlotIndex').click(function (event) {
        $('#rentMonthly').addClass('none');
        $('#maxPrice').removeClass('none');
        });

        $('#radio4, #radio5').click(function (event) {
        $('#purposeIndex').addClass('none');
        });
        $('#radio3').click(function (event) {
        $('#purposeIndex').removeClass('none');
        });

        
});


//=========================
//    new-property.ejs
//=========================

$( document ).ready(function() {
        $('.other').click(function (event) {
        $('#school').addClass('none')
        });
        $('#com').click(function (event){
            $('#school').removeClass('none');
        });
        
        $('#home').click(function (event){
            $('#homeDetails').removeClass('none');
        });
        
        $('.homeOther').click(function (event) {
        $('#homeDetails').addClass('none')
        });
        
        $('#hostel').click(function (event){
            $('#priceLabel').addClass('none');
            $('#hostelRent').removeClass('none');
        });
        $('.hostelOther').click(function (event) {
        $('#priceLabel').removeClass('none');
        $('#hostelRent').addClass('none');
        });
    
//Hostel Radio Button Setting
    $('#hostel').click(function(event){
        $('#landAr').addClass('none');
    });
    $('#com, #home, #plot').click(function(event){
        $('#landAr').removeClass('none');
    });
    
//To control purpose when Plot And Hostel are selected
    $('.controlPurpose').click(function(event){
        $('#plotAndHostel').addClass('none');
    });
    $('.showPurpose').click(function(event){
        $('#plotAndHostel').removeClass('none');
    });
        
});

//=========================
//    property search result
//=========================


$(document).ready(function() {
    $('.contactOwner').click(function (event) {
        $(this).addClass('none');
        $(this).next().removeClass('none');
        });
});



//=========================
//    property detail slider
//=========================
$(document).ready(function() {
    $('.pgwSlider').pgwSlider();
});



//=========================
//    Add Property Page
//=========================
function myFunction() {
    document.getElementById("myRadio").required = true;
    document.getElementById("demo").innerHTML = "The required property was set. The radio button must now be checked before submitting the form.";
}




//=========================
//    Side-Bar
//=========================
 function htmlbodyHeightUpdate(){
		var height3 = $( window ).height()
		var height1 = $('.nav').height()+50
		height2 = $('.main').height()
		if(height2 > height3){
			$('html').height(Math.max(height1,height3,height2)+10);
			$('body').height(Math.max(height1,height3,height2)+10);
		}
		else
		{
			$('html').height(Math.max(height1,height3,height2));
			$('body').height(Math.max(height1,height3,height2));
		}
		
	}
	$(document).ready(function () {
		htmlbodyHeightUpdate()
		$( window ).resize(function() {
			htmlbodyHeightUpdate()
		});
		$( window ).scroll(function() {
			height2 = $('.main').height()
  			htmlbodyHeightUpdate()
		});
	});

//=========================
//    Text-Slider
//=========================
$(document).ready(function () {
    //rotation speed and timer
    var speed = 5000;
    
    var run = setInterval(rotate, speed);
    var slides = $('.slide');
    var container = $('#slides ul');
    var elm = container.find(':first-child').prop("tagName");
    var item_width = container.width();
    var previous = 'prev'; //id of previous button
    var next = 'next'; //id of next button
    slides.width(item_width); //set the slides to the correct pixel width
    container.parent().width(item_width);
    container.width(slides.length * item_width); //set the slides container to the correct total width
    container.find(elm + ':first').before(container.find(elm + ':last'));
    resetSlides();
    
    
    //if user clicked on prev button
    
    $('#buttons a').click(function (e) {
        //slide the item
        
        if (container.is(':animated')) {
            return false;
        }
        if (e.target.id == previous) {
            container.stop().animate({
                'left': 0
            }, 1500, function () {
                container.find(elm + ':first').before(container.find(elm + ':last'));
                resetSlides();
            });
        }
        
        if (e.target.id == next) {
            container.stop().animate({
                'left': item_width * -2
            }, 1500, function () {
                container.find(elm + ':last').after(container.find(elm + ':first'));
                resetSlides();
            });
        }
        
        //cancel the link behavior            
        return false;
        
    });
    
    //if mouse hover, pause the auto rotation, otherwise rotate it    
    container.parent().mouseenter(function () {
        clearInterval(run);
    }).mouseleave(function () {
        run = setInterval(rotate, speed);
    });
    
    
    function resetSlides() {
        //and adjust the container so current is in the frame
        container.css({
            'left': -1 * item_width
        });
    }
    
});
//a simple function to click next link
//a timer will call this function, and the rotation will begin

function rotate() {
    $('#next').click();
}
