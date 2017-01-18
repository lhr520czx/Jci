(ns jci-spider.core
  (:require [clj-http.client :as client]))

(defn get-html-body
  "docstring"
  [url]
  (:body (client/get url)))
(defn my-re-find
  "docstring"
  ([reg n strs] (nth (re-find reg strs) n))
  ([n matcher] (nth (re-find matcher) n))
  )

(defn loop-matcher
  "docstring"
  [matcher]
  (loop [matcher matcher res []]
    (let [x (nth (re-find matcher) 2)]
      (if-not x
        res
        (recur matcher (conj res x))))))

(defn get-movie-s
  "docstring"
  []
  (->> "https://movie.douban.com/"
       (get-html-body)
       (my-re-find #"(?s)(<div class=\"billboard-bd\">)(.*)(</table>)" 2)
       (re-matcher #"(/\">)(.*)(</a>)")
       (loop-matcher)))

(defn get-torrent
  "docstring"
  [movie]
  (->> (get-html-body (str "http://www.diaosisou.com/list/" movie))
       (re-matcher #"(<div class=\"T1\">)(.*)(</div>)")
       (loop-matcher)
       (map #(re-matcher #"(torrent/)(.*)(=)" %))
       (map #(my-re-find 2 %))
       (remove nil?)
       (map #(my-re-find #"(.*)(\">)" 1 %))
       (map #(str "http://www.diaosisou.com/torrent/" %))
       ))

(defn get-torrent-list
  "docstring"
  []
  (map #(if (empty? %)
          (println "don't found resouce")
          (println (get-torrent %)))
       (get-movie-s)))

(get-movie-s)
(get-torrent-list)







