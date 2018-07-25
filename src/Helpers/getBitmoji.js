export default async username =>
  fetch(`https://feelinsonice-hrd.appspot.com/web/deeplink/snapcode?username=${username}&type=SVG&bitmoji=enable`)
    .then(res => res.text())
    .then(body => body && /href="(data:.*?)"/.exec(body)[1])
    .catch(e => {
      return null;
    });
