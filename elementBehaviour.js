// Get the element with id="default-open" and click on it
$("#default-open")[0].click();

// --- Show/hide tab content and activate/deactivate tab links
function openCity(evt, cityName) {

  // Hide all elements with class "tab-content"
  $(".tab-content").each(function() {
    $(this).hide();
  });

  // Show element cityName
  $("#" + cityName).show();

  // Remove class "active" to all elements of class "tab-links" 
  $(".tab-links").each(function() {
    $(this).removeClass("active");
  });

  // Add class active to current target element of (onclick) event
  $(evt.currentTarget).addClass("active");
}

