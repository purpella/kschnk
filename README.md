# Поздравление с Audi A6 C6 (v3)

Положи ВСЕ в одну НОВУЮ папку:
  index.html, style.css, script.js, game.js   (из архива)
  car.png                                     (твоя машина)
  meme.jpg                                    (твоё фото/мем для победы в игре)
  photos/ videos/ music/                      (по желанию)

Тексты, фото, видео, музыка, цвета, игра: блок CONFIG в начале script.js.
Подгонка колёс: index.html?debug=1

Фото к воспоминанию:  { y: "Начало", t: "текст", img: "photos/1.jpg" }
Фотоальбом:           gallery: [{ src: "photos/1.jpg", caption: "Подпись" }]
Видео (файл):         videos: [{ src: "videos/trip.mp4", title: "Название" }]
Видео (YouTube):      videos: [{ youtube: "ID_ИЗ_ССЫЛКИ", title: "Название" }]
Музыка:               music: "music/track.mp3"
Порядок разделов:     sections: ["hero","wishes","gallery","stats","road","video","game","finish"]

YouTube работает только когда сайт открыт по http(s), например на GitHub Pages, а не из файла.
GitHub Pages: залей все файлы и папки в корень репозитория, Settings -> Pages -> main / root.
