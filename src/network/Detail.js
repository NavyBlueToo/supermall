import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: "/recommend"
  })
}

export class Goods {
  constructor(itemIndfo, columns, services) {
    this.title = itemIndfo.title;
    this.desc = itemIndfo.desc;
    this.newPrice = itemIndfo.price;
    this.oldPrice = itemIndfo.oldPrice;
    this.discount = itemIndfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemIndfo.lowNowPrice;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}