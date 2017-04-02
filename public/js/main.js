//alert("kKKKKKKKKKK");

//=========================
//    index.ejs
//=========================

$( document ).ready(function() {
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
//    property detail slider
//=========================
$(document).ready(function() {
    $('.pgwSlider').pgwSlider();
});





//=========================
//    Pata nhe
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