/* eslint-disable max-classes-per-file */
/**
 * pagination
 */

class Pagination {
  constructor(target, { page = 1, size = 10, pageSize = 10 }) {
    this.options = {
      size,
      pageSize,
      page,
    };
    this.page = page;
    this.totalElements = target.length;
    this.totalPages = this.getTotalPageCnt();
    if (this.totalPages < page) {
      this.contents = [];
      this.next = false;
      this.prev = false;
      this.pageList = [page];
    } else {
      this.contents = this.getContents(target);
      this.next = this.getHasNext();
      this.prev = this.getHasPrevious();
      this.pageList = this.getPageList();
    }
    delete this.options;
  }

  getTotalPageCnt() {
    return Math.ceil(this.totalElements / this.options.size);
  }

  getContents(target) {
    const s = (this.page - 1) * this.options.size;
    const e = this.page * this.options.size;
    return Array.prototype.slice.call(target, s, e);
  }

  getHasPrevious() {
    return this.getFirstPageNum() !== 1;
  }

  getHasNext() {
    return this.getLastPageNum() !== this.totalPages;
  }

  getFirstPageNum() {
    return this.page - (this.page % this.options.pageSize) + 1;
  }

  getLastPageNum() {
    const rs = this.page - (this.page % this.options.pageSize) + this.options.pageSize;
    return rs > this.totalPages ? this.totalPages : rs;
  }

  getPageList() {
    let idx = this.getFirstPageNum();
    const e = this.getLastPageNum();
    if (e === 1) return [this.page];
    const rs = [];
    while (idx < e) {
      rs.push(idx);
      idx += 1;
    }
    return rs;
  }
}

module.exports = Pagination;
