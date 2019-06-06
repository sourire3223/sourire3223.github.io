var window_height;
var window_width;
var navbar_initialized = false;
var nav_toggle;
var $toggle = $('.navbar-toggler');
var materialType = 'a'
var targetItem = ''
var materialData = {
	orderIndex:			[6, 3, 5, 4, 1, 2, 0],
	purplePowder:		435,
	purpleStone:		1140,
	purpleEquip:		761,
	purpleMaxedEquip:	20080,
	orangePowder:		1500,
	orangeEquip:		3000,
	orangeMaxedEquip:	131794
}
var equipData = {
	purpleWeapon:	59800,
	orangeWeapon:	395200,
	greenWeapon:	1216800,
	redWeapon:		2940600,
	redWeapon40:	4915755,
	purpleArmor:	45994,
	orangeArmor:	304000,
	greenArmor:		936000,
	redArmor:		2262000,
	redArmor40:		3781350
}

function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false;}
}
var lg = "linear-gradient";
function lock(id){
	el = document.getElementById(id);
	el.classList.add("locked");
	el.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))," + el.style.backgroundImage;
}
function unlock(id){
	el = document.getElementById(id);
	el.classList.remove("locked");
	el.style.backgroundImage = el.style.backgroundImage.substr(el.style.backgroundImage.indexOf(lg, 14));
}
function equipToggleTarget(id){
	el = document.getElementById(id);
	if(el.classList.contains("locked")){
		return;
	}
	$resultEquip = $("#resultEquip")
	$resultEquip.empty()
	if (el.classList.contains("targeted")){
		el.classList.remove("targeted");
		targetItem = ''
		document.querySelectorAll("#equip > button").forEach(function(e){
			if(e.id === id){
				e.style.backgroundImage = e.style.backgroundImage.substr(e.style.backgroundImage.indexOf(lg, 14));
			}
			else{
				unlock(e.id);
			}
		})
	}
	else{
		el.classList.add("targeted");
		targetItem = id
		
		if(id.includes("Armor") && materialType === 'w'){
			document.querySelectorAll("#material > button").forEach(function(e){
				e.style.backgroundImage = e.style.backgroundImage.replace("weapon", "armor");
				materialType = 'a';
			})
		}
		else if(id.includes("Weapon") && materialType === 'a'){
			document.querySelectorAll("#material > button").forEach(function(e){
				e.style.backgroundImage = e.style.backgroundImage.replace("armor", "weapon");
				materialType = 'w';
			})
		}
		
		$resultEquip.append($("<button>").attr("style", "background-image:" + el.style.backgroundImage).attr('onClick', 'equipToggleTarget("' + el.id + '")').append($(el.children).clone()))
		console.log($resultEquip)
		document.querySelectorAll("#equip > button").forEach(function(e){
			if(e.id === id){
				e.style.backgroundImage = "linear-gradient(rgba(191,92,60,0.8), rgba(191,92,60,0.8)), " + e.style.backgroundImage;
			}
			else{
				lock(e.id);
			}
		})	
	}
	calc()	
}
function materialToggleSelect(id){
	el = document.getElementById(id);
	
	if (el.classList.contains("selected")){
		el.classList.remove("selected");
		el.style.backgroundImage = el.style.backgroundImage.substr(el.style.backgroundImage.indexOf(lg, 14));
	}
	else{
		el.classList.add("selected");
		el.style.backgroundImage = "linear-gradient(rgba(121,136,154,0.6), rgba(121,136,154,0.6))," + el.style.backgroundImage;
		
	}
	calc()
}
function calc(){
	// if(targetItem === ''){return}
	var materialStates = document.querySelectorAll("#material > button")
	var remainingCost = (targetItem === "" ? 0 : equipData[targetItem])
	$resultMaterial = $("#resultMaterial")
	$resultMaterial.empty()
	materialData.orderIndex.forEach(function(i){
		if(materialStates[i].classList.contains("selected")){
			$button = $("<button>").attr("style", "background-image:" + materialStates[i].style.backgroundImage.substr(materialStates[i].style.backgroundImage.indexOf(lg, 14)))
			$button.append($("<span>").text(((remainingCost / materialData[materialStates[i].id]) >> 0)))
			$button.append($(materialStates[i].children).clone())
			$button.attr('onClick', 'materialToggleSelect("' + materialStates[i].id + '")')
			$resultMaterial.append($button)
			remainingCost %= materialData[materialStates[i].id]
		}
		
	})
}

 
 
 
var offCanvas = {
    sidenav: {
        // Sidenav is not visible by default.
        // Change to 1 if necessary
        sidenav_visible: 0
    },
    initSideNav: function initSideNav() {
        if (!navbar_initialized) {
			// Set the toggle-variable to the Bootstrap navbar-toggler button
 
            // Add/remove classes on toggle and set the visiblity of the sidenav,
            // and append the overlay. Also if the user clicks the overlay,
            // the sidebar will close
            $toggle.on('click', function () {
                if (offCanvas.sidenav.sidenav_visible == 1) {
                    $('html').removeClass('nav-open');
                    offCanvas.sidenav.sidenav_visible = 0;
                    setTimeout(function() {
                        $toggle.removeClass('toggled');
                    }, 300);
                } else {
                    setTimeout(function() {
                        $toggle.addClass('toggled');
                    }, 300);
 
                    $('html').addClass('nav-open');
                    offCanvas.sidenav.sidenav_visible = 1;
                }
            });
            // Set navbar to initialized
            navbar_initialized = true;
        }
    },
	swipeOutListener: function(){
		var swipe = document.getElementById("swipe");

		var SwipeListener = {
			isScrolling: undefined,
			isSwipeRight: true,
			start: null,
			curr:null,
			handleEvent: function(e){
				switch (e.type) {
					case 'touchstart': this.onTouchStart(e); break;
					case 'touchmove':  this.onTouchMove(e); break;
					case 'touchcancel':  
					case 'touchend': this.onTouchEnd(e); break;
				}
			},
			onTouchStart: function(e){
				this.start = {x: e.touches[0].pageX, y: e.touches[0].pageY}
				this.curr = {x: e.touches[0].pageX, y: e.touches[0].pageY}
				e.stopPropagation();
			},
			
			onTouchMove: function(e){
				if(!this.start)
					return;
				dx = e.touches[0].pageX - this.curr.x
				this.curr.x = e.touches[0].pageX 
				if(typeof this.isScrolling == 'undefined') {
					this.isScrolling = (2*Math.abs(dx) < Math.abs(e.touches[0].pageY - this.start.y));
				}
				if(!this.isScrolling){
					e.preventDefault();	
				}
			},
			onTouchEnd: function(e){
				if (!this.isScrolling) {
					if(!this.start) return;

				
					if ((this.start.x - this.curr.x >  window_width / 12) && offCanvas.sidenav.sidenav_visible == 0){
						setTimeout(function() {
							$toggle.addClass('toggled');
						}, 300);
						$('html').addClass('nav-open');
						offCanvas.sidenav.sidenav_visible = 1;
					}
					else if((this.start.x - this.curr.x < 12) && offCanvas.sidenav.sidenav_visible == 1){
						$('html').removeClass('nav-open');
						offCanvas.sidenav.sidenav_visible = 0;
						setTimeout(function() {
							$toggle.removeClass('toggled');
						}, 300);
			}
				}
				this.start = null;
				this.curr = null;
				this.isScrolling = undefined;
				e.stopPropagation();

			}
		}
		swipe.addEventListener('touchstart', SwipeListener, {passive:false});
		swipe.addEventListener('touchmove', SwipeListener, {passive:false});
		swipe.addEventListener('touchend', SwipeListener, {passive:false});
		swipe.addEventListener('touchcancel', SwipeListener, {passive:false});
	}
};
 
$(document).ready(function () {
	// UI
   window_width = $(window).width();
 
    nav_toggle = $('nav').hasClass('navbar-offcanvas') ? true : false;
 
    if (window_width > 992) {
		var $navItems = $("#NavItems")
		$("a.navbar-brand").after($navItems[0])
		$("body > .navbar-collapse::after").hide()
		// $navItems.remove()
    }
	else if(isMobile()){
		$("button.navbar-icon")[0].removeAttribute("style");
        offCanvas.initSideNav();
        offCanvas.swipeOutListener();
		// Close the sidebar if the user clicks a link or a dropdown-item,
		// and close the sidebar
		$('.nav-link:not(.dropdown-toggle), .dropdown-item').on('click', function () {
			var $toggle = $('.navbar-toggler');
			$('html').removeClass('nav-open');
			offCanvas.sidenav.sidenav_visible = 0;
			setTimeout(function () {
				$toggle.removeClass('toggled');
			}, 300);
		});
	}
	else{
		$("button.navbar-icon")[0].removeAttribute("style");
		offCanvas.initSideNav();
	}
	// Calc UI
	
	
	// Calc func
	
});                