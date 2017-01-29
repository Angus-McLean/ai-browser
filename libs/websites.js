(function (context) {
	var AI_Browser = context.AI_Browser = context.AI_Browser || {};
	AI_Browser.libs = AI_Browser.libs || {};

	AI_Browser.libs.websites = ["http://facebook.com/","http://twitter.com/","http://google.com/","http://youtube.com/","http://wordpress.org/","http://linkedin.com/","http://instagram.com/","http://pinterest.com/","http://hugedomains.com/","http://wikipedia.org/","http://sedo.com/","http://sedoparking.com/","http://adobe.com/","http://blogspot.com/","http://apple.com/","http://wordpress.com/","http://godaddy.com/","http://tumblr.com/","http://amazon.com/","http://vimeo.com/","http://youtu.be/","http://yahoo.com/","http://flickr.com/","http://microsoft.com/","http://goo.gl/","http://qq.com/","http://buydomains.com/","http://bit.ly/","http://whoisprivacyprotect.com/","http://reddit.com/","http://w3.org/","http://weebly.com/","http://baidu.com/","http://statcounter.com/","http://networkadvertising.org/","http://nytimes.com/","http://vk.com/","http://blogger.com/","http://myspace.com/","http://t.co/","http://parallels.com/","http://addthis.com/","http://jimdo.com/","http://bluehost.com/","http://secureserver.net/","http://google.de/","http://bbc.co.uk/","http://wix.com/","http://soundcloud.com/","http://europa.eu/","http://ascii.co.uk/","http://feedburner.com/","http://digg.com/","http://miibeian.gov.cn/","http://mozilla.org/","http://github.com/","http://ovh.net/","http://gov.uk/","http://stumbleupon.com/","http://cnn.com/","http://yandex.ru/","http://miitbeian.gov.cn/","http://paypal.com/","http://123-reg.co.uk/","http://creativecommons.org/","http://weibo.com/","http://huffingtonpost.com/","http://issuu.com/","http://theguardian.com/","http://nih.gov/","http://imdb.com/","http://wp.com/","http://go.com/","http://google.co.jp/","http://wsj.com/","http://msn.com/","http://forbes.com/","http://slideshare.net/","http://yelp.com/","http://dropbox.com/","http://amazonaws.com/","http://e-recht24.de/","http://washingtonpost.com/","http://macromedia.com/","http://ebay.com/","http://addtoany.com/","http://icio.us/","http://51.la/","http://taobao.com/","http://etsy.com/","http://eventbrite.com/","http://sourceforge.net/","http://free.fr/","http://ameblo.jp/","http://typepad.com/","http://bing.com/","http://about.com/","http://reuters.com/","http://telegraph.co.uk/","http://fc2.com/","http://aol.com/","http://constantcontact.com/","http://google.co.uk/","http://archive.org/","http://usatoday.com/","http://cpanel.net/","http://yahoo.co.jp/","http://livejournal.com/","http://amazon.de/","http://xing.com/","http://dailymail.co.uk/","http://cpanel.com/","http://domainactive.co/","http://bbb.org/","http://eepurl.com/","http://joomla.org/","http://amazon.co.uk/","http://1und1.de/","http://time.com/","http://mail.ru/","http://hostnet.nl/","http://hatena.ne.jp/","http://cdc.gov/","http://fabulous.com/","http://latimes.com/","http://domainname.ru/","http://delicious.com/","http://elegantthemes.com/","http://harvard.edu/","http://webs.com/","http://npr.org/","http://wikimedia.org/","http://bloomberg.com/","http://dailymotion.com/","http://live.com/","http://surveymonkey.com/","http://guardian.co.uk/","http://networksolutions.com/","http://163.com/","http://name.com/","http://google.fr/","http://apache.org/","http://wixsite.com/","http://homestead.com/","http://ovh.com/","http://bandcamp.com/","http://mit.edu/","http://gnu.org/","http://one.com/","http://tripadvisor.com/","http://amazon.co.jp/","http://stanford.edu/","http://list-manage.com/","http://blogspot.co.uk/","http://wired.com/","http://geocities.com/","http://amzn.to/","http://disqus.com/","http://opera.com/","http://namejet.com/","http://google.es/","http://doubleclick.net/","http://nasa.gov/","http://kickstarter.com/","http://rambler.ru/","http://hover.com/","http://cnet.com/","http://trustpilot.com/","http://behance.net/","http://photobucket.com/","http://scribd.com/","http://businessinsider.com/","http://ca.gov/","http://googleusercontent.com/","http://google.it/","http://sohu.com/","http://ted.com/","http://tripod.com/","http://imgur.com/","http://google.ca/","http://domainname.de/","http://bbc.com/","http://deviantart.com/","http://hibu.com/","http://independent.co.uk/","http://pbs.org/","http://barnesandnoble.com/","http://un.org/","http://adition.com/","http://rakuten.co.jp/","http://detik.com/","http://wiley.com/","http://mijndomein.nl/","http://mashable.com/","http://cbsnews.com/","http://github.io/","http://who.int/","http://goodreads.com/","http://ibm.com/","http://nationalgeographic.com/","http://berkeley.edu/","http://medium.com/","http://whitehouse.gov/","http://afternic.com/","http://loopia.se/","http://technorati.com/","http://away.ru/","http://homes.ru/","http://foxnews.com/","http://salenames.ru/","http://promopages.ru/","http://spotify.com/","http://ifeng.com/","http://mapquest.com/","http://histats.com/","http://theatlantic.com/","http://usda.gov/","http://bestfwdservice.com/","http://loopia.com/","http://visma.com/","http://techcrunch.com/","http://blogspot.com.es/","http://engadget.com/","http://cornell.edu/","http://1and1.fr/","http://epa.gov/","http://php.net/","http://nature.com/","http://squarespace.com/","http://themeforest.net/","http://jiathis.com/","http://umblr.com/","http://vkontakte.ru/","http://buzzfeed.com/","http://noaa.gov/","http://sakura.ne.jp/","http://a8.net/","http://sogou.com/","http://gravatar.com/","http://ft.com/","http://cbc.ca/","http://sciencedirect.com/","http://1and1.com/","http://baiyewang.com/","http://altervista.org/","http://blogspot.ca/","http://meetup.com/","http://home.pl/","http://blogspot.de/","http://bizjournals.com/","http://change.org/","http://ning.com/","http://100ye.com/","http://nps.gov/","http://ow.ly/","http://wufoo.com/","http://webmd.com/","http://loc.gov/","http://about.me/","http://economist.com/","http://springer.com/","http://sfgate.com/","http://google.com.au/","http://acquirethisname.com/","http://myshopify.com/","http://usnews.com/","http://hp.com/","http://foursquare.com/","http://bola.net/","http://spiegel.de/","http://cbslocal.com/","http://prnewswire.com/","http://phpbb.com/","http://xinhuanet.com/","http://chicagotribune.com/","http://fda.gov/","http://google.nl/","http://blogspot.fr/","http://businessweek.com/","http://clickbank.net/","http://skype.com/","http://abc.net.au/","http://marriott.com/","http://cloudfront.net/","http://slate.com/","http://wikia.com/","http://bigcartel.com/","http://naver.com/","http://newyorker.com/","http://nydailynews.com/","http://nifty.com/","http://umich.edu/","http://ustream.tv/","http://list-manage1.com/","http://uk2.net/","http://ed.gov/","http://house.gov/","http://irs.gov/","http://wp.me/","http://geocities.jp/","http://state.gov/","http://rs6.net/","http://ocn.ne.jp/","http://people.com.cn/","http://phoca.cz/","http://weather.com/","http://cnbc.com/","http://nbcnews.com/","http://yale.edu/","http://dreamhost.com/","http://beian.gov.cn/","http://line.me/","http://booking.com/","http://columbia.edu/","http://gizmodo.com/","http://hostgator.com/","http://linksynergy.com/","http://livedoor.jp/","http://enable-javascript.com/","http://fb.me/","http://dribbble.com/","http://unesco.org/","http://shopify.com/","http://domainnameshop.com/","http://wunderground.com/","http://storify.com/","http://hilton.com/","http://netcraft.com/","http://upenn.edu/","http://debian.org/","http://washington.edu/","http://register.it/","http://domeneshop.no/","http://nazwa.pl/","http://hexun.com/","http://senate.gov/","http://studiopress.com/","http://reverbnation.com/","http://directdomains.com/","http://houzz.com/","http://alibaba.com/","http://jdoqocy.com/","http://haljl.com/","http://businesswire.com/","http://vice.com/","http://android.com/","http://drupal.org/","http://gstatic.com/","http://indiatimes.com/","http://zdnet.com/","http://marketwatch.com/","http://doi.org/","http://xiti.com/","http://mlb.com/","http://fortune.com/","http://utexas.edu/","http://youku.com/","http://1688.com/","http://samsung.com/","http://theverge.com/","http://fb.com/","http://wisc.edu/","http://mozilla.com/","http://cdbaby.com/","http://alexa.com/","http://nhs.uk/","http://goo.ne.jp/","http://nic.tel/","http://fastcompany.com/","http://iqiyi.com/","http://oracle.com/","http://psu.edu/","http://ap.org/","http://census.gov/","http://ranshao.com/","http://aspcms.com/","http://tmall.com/","http://ftc.gov/","http://aliyun.com/","http://ox.ac.uk/","http://campaign-archive1.com/","http://istockphoto.com/","http://paginegialle.it/","http://ewebdevelopment.com/","http://si.edu/","http://campaign-archive2.com/","http://sagepub.com/","http://worldbank.org/","http://usgs.gov/","http://mailchimp.com/","http://last.fm/","http://icann.org/","http://sciencemag.org/","http://axs.com/","http://google.pl/","http://intel.com/","http://yellowbook.com/","http://prweb.com/","http://princeton.edu/","http://t-online.de/","http://telnic.org/","http://shareasale.com/","http://wikihow.com/","http://soup.io/","http://redcross.org/","http://shinystat.com/","http://west.cn/","http://inc.com/","http://cisco.com/","http://china.com/","http://uol.com.br/","http://oxfordjournals.org/","http://gofundme.com/","http://att.com/","http://zendesk.com/","http://hhs.gov/","http://cam.ac.uk/","http://arstechnica.com/","http://cyberchimps.com/","http://web.de/","http://plesk.com/","http://cryoutcreations.eu/","http://dropboxusercontent.com/","http://cmu.edu/","http://hbr.org/","http://usa.gov/","http://cafepress.com/","http://smugmug.com/","http://politico.com/","http://mysql.com/","http://dell.com/","http://themegrill.com/","http://safedog.cn/","http://oecd.org/","http://livestream.com/","http://entrepreneur.com/","http://comsenz.com/","http://stackoverflow.com/","http://nsw.gov.au/","http://discuz.net/","http://amazon.fr/","http://accuweather.com/","http://netscape.com/","http://google.co.in/","http://hubspot.com/","http://wordpress-fr.net/","http://hibustudio.com/","http://fotolia.com/","http://com.com/","http://odnoklassniki.ru/","http://tripadvisor.co.uk/","http://state.tx.us/","http://tandfonline.com/","http://globo.com/","http://cn7w.net/","http://google.com.br/","http://nginx.org/","http://dot.gov/","http://nielsen.com/","http://presscustomizr.com/","http://ieee.org/","http://youronlinechoices.com/","http://google.com.hk/","http://shop-pro.jp/","http://onamae.com/","http://aboutcookies.org/","http://quantcast.com/","http://zenfolio.com/","http://xrea.com/","http://allaboutcookies.org/","http://teamviewer.com/","http://eb.com.cn/","http://welt.de/","http://qiangmi.com/","http://warnerbros.com/","http://windowsphone.com/","http://antaranews.com/","http://dandomain.dk/","http://mingyou.com/","http://viva.co.id/","http://prestashop.com/","http://sitemeter.com/","http://enom.com/","http://wn.com/","http://example.com/","http://gpo.gov/","http://woothemes.com/","http://bund.de/","http://pcworld.com/","http://tucows.com/","http://chinadaily.com.cn/","http://venturebeat.com/","http://huanqiu.com/","http://adweek.com/","http://admin.ch/","http://lulu.com/","http://openstreetmap.org/","http://wsimg.com/","http://areasnap.com/","http://box.com/"];
})(this);