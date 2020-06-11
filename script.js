  //ambil canvas nya dulu
  const cvs = document.querySelector("#canvas");
  const ctx = cvs.getContext("2d");

  // membuat object gambar
  // dan kasih gambarnya dengan method src
  const burung = new Image();
  const bg = new Image();
  const pipaAtas = new Image();
  const pipaBawah = new Image();
  const tanah = new Image();
  burung.src = "images/bird.png";
  bg.src = "images/bg.png";
  pipaAtas.src = "images/pipeNorth.png";
  pipaBawah.src = "images/pipeSouth.png";
  tanah.src = "images/fg.png";

  // buat variable tambahan 
  const bx = 15;
  let by = 115;
  let score = 0;
  const gravitasi = 1;

  const suaraTerbang = new Audio();
  const suaraDapatSkor = new Audio();

  suaraTerbang.src = "sounds/fly.mp3";
  suaraDapatSkor.src = "sounds/score.mp3";

  /*buatkan array pipa yang berisi object dengan memiliki dua method yaitu x dan y 
  dimana x itu berisi lebar kanvas dan y 0
  dimana maksud pemberian x itu kaarena nanti ketika di looping nllai x akan aberkurang sehingga membuat seolah olah  sumbu mendeakati 
  */

  let pipa = [];
  pipa[0] = {
      x: cvs.width,
      y: 0
  };

  // buat function untuk terbang
  window.addEventListener("keydown", function (e) {
      if (e.which == 38 || e.which == 32) {
          terbang();
      } else if (e.which == 40) {
          turun();
      }
  });

  function terbang() {
      by -= 20;
      suaraTerbang.play();
  }

  function turun() {
      by += 15;
  }





  // buat function lukis diaman kita akan mulai menggambar pada tag canvas dan memberikan animasi

  function lukis() {
      ctx.drawImage(bg, 0, 0);
      ctx.drawImage(burung, bx, by);

      /* animas membuat pipanya maju mendekati burung
          kita membuatkan loopingnya 
      */
      for (let i = 0; i < pipa.length; i++) {
          ctx.drawImage(pipaAtas, pipa[i].x, pipa[i].y);
          ctx.drawImage(pipaBawah, pipa[i].x, pipa[i].y + pipaAtas.height + 85);

          pipa[i].x--;

          if (pipa[i].x == 125) {
              pipa.push({
                  x: cvs.width,
                  y: Math.floor(Math.random() * pipaAtas.height) - pipaAtas.height
              })
          }

          // ketika burung menyentuh pipa dan tanah

          if (bx <= pipa[i].x + pipaAtas.width && bx + burung.width >= pipa[i].x && (by <= pipa[i].y + pipaAtas.height || by + burung.height >= pipa[i].y + pipaAtas.height + 85) || by + burung.height >= cvs.height - tanah.height) {
              location.reload();
          }

          if (pipa[i].x == 5) {
              score++;
              suaraDapatSkor.play();
          }

      }
      ctx.drawImage(tanah, 0, cvs.height - tanah.height);
      by += gravitasi;
      ctx.fillStyle = "#000";
      ctx.font = "20px Verdana";
      ctx.fillText("Score :" + score, 10, cvs.height - tanah.height + 40);

      /*function requestAnimationFrame harus dipanggil karena kalau tidak dipanggil maka tidak jalan */
      requestAnimationFrame(lukis);
  }

  lukis();