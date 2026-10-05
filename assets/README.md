# Artwork provenance and replacement

Usage guidelines checked on **2026-10-05**:
https://www.yuzu-soft.com/new/copy.html

This website is a personal, non-commercial fan presentation. It does not use
YUZUSOFT's logo, game audio, voice samples, sound effects or story spoilers.
The footer credits **© YUZUSOFT/JUNOS INC.**, identifies the rights holder,
prohibits unauthorized republication and states that the site is unaffiliated.

## meguru-portrait.webp

Source: the official `sw_header_meguru.jpg` in the publicly provided website /
social-media artwork bundle:

https://www.yuzu-soft.com/new/product/sothewitch/download.html
https://www.yuzu-soft.com/new/product/sothewitch/bin/sw_twitter.zip

The official banner is 1500 × 500. A 730 × 500 crop at `(120, 0)` omits both the
YUZUSOFT logo and the game-title / release-date graphics. It is encoded as WebP
without upscaling. CSS renders it at no more than its native dimensions.
The guidelines explicitly exempt officially distributed website banners and
icons from the normal 50-percent size reduction requirement. Cropping is
allowed by the image-use section. The complete original bundle is not hosted.

## meguru-standing.webp

Source: the official character page's transparent costume image:

https://www.yuzu-soft.com/new/product/sothewitch/character.html
https://www.yuzu-soft.com/new/product/sothewitch/images/character/main_chara02_pic01.png

The source is 1000 × 750; visible alpha bounds are `(86, 104, 230, 631)`.
The transparent margins are removed, then **both dimensions are reduced by at
least 50 percent** to 115 × 315. CSS never enlarges this image.

## Other assets

`og-image.jpg` uses the same permitted banner crop, below its native size, with
the artwork copyright credit included. Favicon and touch icon are original
Yu Bohong monograms, not YUZUSOFT or Apple marks.

## Replace later

Place licensed replacement artwork at `assets/meguru-portrait.webp` and update
the image's `width` / `height` in `index.html` if its aspect ratio changes.
For a full-body replacement, use `assets/meguru-standing.webp` and update the
matching dimensions and CSS rule. Preserve a transparent background.

Check the replacement's own license. For ordinary official images, physically
reduce width and height to at most 50 percent of the source, and keep the CSS
display dimensions at or below that reduced size. Do not merely change the
HTML attributes while continuing to publish the original high-resolution file.
Do not add original artwork archives or a download button to this repository.
