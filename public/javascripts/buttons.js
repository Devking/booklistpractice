function deleteBook (book_id) {
  var request = new XMLHttpRequest();
  request.open('DELETE', '/books/' + book_id, true);
  request.send();
  request.onload = () => {
    location.reload();
    return false;
  }
}
