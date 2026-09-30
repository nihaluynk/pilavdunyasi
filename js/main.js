AOS.init({
    duration: 680,
    once: true,
    offset: 55
});

/* NAVBAR SCROLL & ACTIVE LINK  */
window.addEventListener('scroll', function() {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('btt').classList.toggle('show', window.scrollY > 300);
    document.querySelectorAll('section[id]').forEach(function(sec) {
        var top = sec.offsetTop - 110,
            bot = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bot) {
            document.querySelectorAll('.nav-link').forEach(function(l) {
                l.classList.remove('active');
            });
            var lnk = document.querySelector('.nav-link[href="#' + sec.id + '"]');
            if (lnk) lnk.classList.add('active');
        }
    });
});

/*  SMOOTH SCROLL + MOBILE NAV CLOSE  */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var t = document.querySelector(href);
        if (t) {
            e.preventDefault();
            // Close Bootstrap mobile navbar if open
            var navCollapse = document.getElementById('navmenu');
            var scrollBehavior = href === '#contact-section' ? 'instant' : 'smooth';
            if (navCollapse && navCollapse.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navCollapse.classList.remove('show');
                }
            }
            // Scroll after slight delay to let navbar close
            setTimeout(function() {
                window.scrollTo({
                    top: t.offsetTop - 78,
                    behavior: scrollBehavior
                });
            }, 50);
        }
    });
});


var searchOv = document.getElementById('searchOv');
var searchInput = document.getElementById('searchInput');

function searchMenu(query) {
    var term = query.trim().toLocaleLowerCase('tr-TR');
    document.querySelectorAll('.mwrap').forEach(function(wrap) {
        var card = wrap.querySelector('.mcard');
        var content = [card.getAttribute('data-title'), card.getAttribute('data-cat'), card.getAttribute('data-desc'), card.textContent].join(' ').toLocaleLowerCase('tr-TR');
        wrap.classList.toggle('gone', term && !content.includes(term));
    });
}

document.getElementById('navSearchBtn').addEventListener('click', function() {
    searchOv.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
        document.getElementById('searchInput').focus();
    }, 220);
});

document.getElementById('searchClose').addEventListener('click', closeSearch);
searchInput.addEventListener('input', function() {
    searchMenu(this.value);
});
document.getElementById('searchSubmit').addEventListener('click', function() {
    closeSearch();
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Close when clicking backdrop
searchOv.addEventListener('click', function(e) {
    if (e.target === searchOv) closeSearch();
});

function closeSearch() {
    searchOv.classList.remove('open');
    document.body.style.overflow = '';
}

// Category buttons inside search box
document.querySelectorAll('.sovcat').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.sovcat').forEach(function(b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
        var f = this.getAttribute('data-cat');
        searchInput.value = '';
        closeSearch();
        setTimeout(function() {
            filterMenu(f);
            document.getElementById('menu').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    });
});

// Trending tags fill the search input
document.querySelectorAll('.sovtrend .ttag').forEach(function(t) {
    t.addEventListener('click', function() {
        document.getElementById('searchInput').value = this.textContent.trim();
        searchMenu(this.textContent.trim());
        closeSearch();
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


$(document).ready(function() {
	$('.magnific_popup').magnificPopup({
	  disableOn: 700,
	  type: 'iframe',
	  mainClass: 'mfp-fade',
	  removalDelay: 160,
	  preloader: false,
	  fixedContentPos: false,
	  disableOn: 300
	});	
});


function filterMenu(cat) {
    // sync filter buttons
    document.querySelectorAll('.filtbtn').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-f') === cat);
    });
    // sync category cards
    document.querySelectorAll('.catcard').forEach(function(c) {
        c.classList.toggle('active', c.getAttribute('data-filter') === cat);
    });
    // show/hide menu cards
    document.querySelectorAll('.mwrap').forEach(function(w) {
        var c = w.getAttribute('data-c');
        if (cat === 'all' || c === cat) {
            w.classList.remove('gone');
            w.style.opacity = '0';
            w.style.transform = 'translateY(16px)';
            setTimeout(function() {
                w.style.transition = 'opacity .38s,transform .38s';
                w.style.opacity = '1';
                w.style.transform = 'translateY(0)';
            }, 60);
        } else {
            w.classList.add('gone');
        }
    });
}

// Filter buttons
document.querySelectorAll('.filtbtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        filterMenu(this.getAttribute('data-f'));
    });
});

// Category section cards â†’ scroll + filter
document.querySelectorAll('.catcard').forEach(function(card) {
    card.addEventListener('click', function() {
        var f = this.getAttribute('data-filter');
        window.scrollTo({
            top: document.getElementById('menu').offsetTop - 80,
            behavior: 'smooth'
        });
        setTimeout(function() {
            filterMenu(f);
        }, 480);
    });
});


var menuPop = document.getElementById('menuPop');
function openMenuPop(card) {
    var img = card.getAttribute('data-img');
    var title = card.getAttribute('data-title');
    var cat = card.getAttribute('data-cat');
    var price = card.getAttribute('data-price');
    var priceLabel = card.getAttribute('data-price-label');
    var rating = parseFloat(card.getAttribute('data-rating'));
    var reviews = card.getAttribute('data-reviews');
    var cal = card.getAttribute('data-cal');
    var calUnit = card.getAttribute('data-cal-unit') || 'porsiyon';
    var time = card.getAttribute('data-time');
    var desc = card.getAttribute('data-desc');
    var ingredients = card.getAttribute('data-ingredients') || '';
    var tags = card.getAttribute('data-tags') || '';

    document.getElementById('mpImg').setAttribute('src', img);
    document.getElementById('mpCat').textContent = cat;
    document.getElementById('mpTitle').textContent = title;

    if (Number.isFinite(rating)) {
        var full = Math.round(rating),
            empty = 5 - full;
        document.getElementById('mpStars').innerHTML =
            '<i class="fas fa-star"></i>'.repeat(full) + '☆'.repeat(empty) +
            ' <span style="color:#bbb;font-size:.78rem;">' + rating + ' (' + reviews + ' değerlendirme)</span>';
    } else {
        document.getElementById('mpStars').textContent = '';
    }

    document.getElementById('mpDesc').textContent = desc;
    var ingredientsEl = document.getElementById('mpIngredients');
    if (ingredientsEl) ingredientsEl.textContent = ingredients;

    document.getElementById('mpPrice').textContent = price ? (priceLabel || price + ' TL') : '';

    var metadata = [];
    if (cal) metadata.push('<div class="mpm"><div class="mpmv">' + cal + ' kcal / ' + calUnit + '</div><div class="mpml">Yaklaşık Kalori</div></div>');
    if (time) metadata.push('<div class="mpm"><div class="mpmv">' + time + ' dk</div><div class="mpml">Hazırlama Süresi</div></div>');
    if (Number.isFinite(rating)) metadata.push('<div class="mpm"><div class="mpmv">' + rating + '/5</div><div class="mpml">Puan</div></div>');
    document.getElementById('mpMeta').innerHTML = metadata.join('');

    document.getElementById('mpTags').innerHTML =
        tags.split(',').filter(Boolean).map(function(t) {
            return '<span class="mptag">' + t.trim() + '</span>';
        }).join('');

    menuPop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.madd i.fa-plus').forEach(function(icon) {
    icon.classList.replace('fa-plus', 'fa-eye');
});

// Card click open popup
document.querySelectorAll('.mcard').forEach(function(card) {
    var priceDisplay = card.querySelector('.mprice');
    if (priceDisplay) {
        var price = card.getAttribute('data-price');
        var priceLabel = card.getAttribute('data-price-label');
        priceDisplay.textContent = price ? (priceLabel || price + ' TL') : '';
    }
    card.addEventListener('click', function() {
        openMenuPop(this);
    });
});

// + button  open popup (stop propagation to avoid double firing)
document.querySelectorAll('.madd').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        openMenuPop(this.closest('.mcard'));
    });
});

// Heart toggle (no popup)
document.querySelectorAll('.mhrt').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var ico = this.querySelector('i');
        ico.classList.toggle('far');
        ico.classList.toggle('fas');
        this.style.color = ico.classList.contains('fas') ? 'var(--primary)' : '#ccc';
    });
});

// Close popup
document.getElementById('mpClose').addEventListener('click', closeMenuPop);
menuPop.addEventListener('click', function(e) {
    if (e.target === this) closeMenuPop();
});

function closeMenuPop() {
    menuPop.classList.remove('open');
    document.body.style.overflow = '';
}

var whatsappNumber = '905449666361';

function openWhatsAppMessage(message) {
    var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
    var chatWindow = window.open(url, '_blank');
    if (chatWindow) {
        chatWindow.opener = null;
    } else {
        window.location.assign(url);
    }
}

function sendFormToWhatsApp(form, heading, confirmationId) {
    var labels = {
        name: 'Ad Soyad',
        phone: 'Telefon',
        email: 'E-posta',
        party: 'Kişi sayısı',
        date: 'Tarih',
        time: 'Saat',
        requests: 'Özel istekler',
        subject: 'Konu',
        message: 'Mesaj'
    };
    var lines = ['Merhaba, ' + heading + '.'];
    new FormData(form).forEach(function(value, key) {
        if (labels[key] && value) lines.push(labels[key] + ': ' + value);
    });
    openWhatsAppMessage(lines.join('\n'));
    var confirmation = document.getElementById(confirmationId);
    confirmation.style.display = 'block';
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    sendFormToWhatsApp(this, 'rezervasyon talebim var', 'resOk');
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    sendFormToWhatsApp(this, 'iletişime geçmek istiyorum', 'ctcOk');
});


var galPop = document.getElementById('galPop');
var galData = [];
var galIdx = 0;

document.querySelectorAll('.gitem').forEach(function(item) {
    galData.push({
        img: item.getAttribute('data-gimg'),
        title: item.getAttribute('data-gtitle'),
        desc: item.getAttribute('data-gdesc')
    });
    item.addEventListener('click', function() {
        openGal(parseInt(this.getAttribute('data-gi')));
    });
});

function openGal(i) {
    galIdx = i;
    var g = galData[i];
    document.getElementById('gpImg').setAttribute('src', g.img);
    document.getElementById('gpTitle').textContent = g.title;
    document.getElementById('gpDesc').innerHTML = g.desc;
    galPop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('gpClose')?.addEventListener('click', closeGal);
galPop?.addEventListener('click', function(e) {
    if (e.target === this) closeGal();
});

function closeGal() {
    if (!galPop) return;
    galPop.classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('gpPrev')?.addEventListener('click', function() {
    openGal((galIdx - 1 + galData.length) % galData.length);
});
document.getElementById('gpNext')?.addEventListener('click', function() {
    openGal((galIdx + 1) % galData.length);
});

/*  ESC key closes everything */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
        closeMenuPop();
        closeGal();
        if (typeof $.magnificPopup !== 'undefined') $.magnificPopup.close();
    }
});


new Swiper('.tesSwiper', {
    slidesPerView: 1,
    spaceBetween: 22,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});


var cH = 8,
    cM = 45,
    cS = 30;
var countdownHours = document.getElementById('cdH');
var countdownMinutes = document.getElementById('cdM');
var countdownSeconds = document.getElementById('cdS');
if (countdownHours && countdownMinutes && countdownSeconds) setInterval(function() {
    cS--;
    if (cS < 0) {
        cS = 59;
        cM--;
    }
    if (cM < 0) {
        cM = 59;
        cH--;
    }
    if (cH < 0) {
        cH = 8;
        cM = 45;
        cS = 30;
    }
    countdownHours.textContent = String(cH).padStart(2, '0');
    countdownMinutes.textContent = String(cM).padStart(2, '0');
    countdownSeconds.textContent = String(cS).padStart(2, '0');
}, 1000);

/* â”€â”€ NEWSLETTER â”€â”€ */
var newsletterButton = document.getElementById('nlBtn');
if (newsletterButton) newsletterButton.addEventListener('click', function() {
    var email = document.getElementById('nlEmail').value;
    if (email && email.includes('@')) {
        var btn = this;
        btn.textContent = '✓ Abone olundu!';
        btn.style.background = '#4ade80';
        btn.style.color = '#222';
        document.getElementById('nlEmail').value = '';
        setTimeout(function() {
            btn.textContent = 'Abone Ol';
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    }
});

/*  NUMBER COUNTER ANIMATION*/
var numAnimated = false;
window.addEventListener('scroll', function() {
    var hero = document.getElementById('hero');
    if (!numAnimated && hero && window.scrollY > hero.offsetHeight - 300) {
        numAnimated = true;
        document.querySelectorAll('.snum').forEach(function(el) {
            var txt = el.textContent;
            var num = parseInt(txt);
            var suf = txt.replace(/[0-9]/g, '');
            if (isNaN(num)) return;
            var start = 0;
            var step = Math.ceil(num / 55);
            var iv = setInterval(function() {
                start += step;
                if (start >= num) {
                    start = num;
                    clearInterval(iv);
                }
                el.textContent = start + suf;
            }, 1400 / 55);
        });
    }
});