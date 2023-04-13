import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RtgApiService {

  static apiUrl = 'https://topo-guide-escalade.fr/';
  constructor() { }
  static cacheDatas = new Map<string, object>();
  static cachePylogn = new Map<string, object>();
  static responseFromCache = [];

  getMapsDatas(mapsBounds: any, zoom: number) {
    // console.log('getMapsDatas', mapsBounds);
    const mapsOptions = {
      swLat: mapsBounds._southWest.lat,
      swLng: mapsBounds._southWest.lng,
      neLat: mapsBounds._northEast.lat,
      neLng: mapsBounds._northEast.lng,
      zoomLevel: zoom,
    };
    return this.fetchMapsDatas(mapsOptions);
  }

  getScPolygon(sc: any) {
    return new Promise((resolve, reject) => {
      const key = 'sc§' + sc.id;
      if (RtgApiService.cachePylogn.has(key)) {
        resolve(RtgApiService.cachePylogn.get(key));
      } else {
        // let polygon = [];
        this.getDatas('sc', sc.id)
          .then((scDatas: any) => {
            // console.log('scdatas', scDatas);
            if (RtgApiService.cachePylogn.has(key)) {
              RtgApiService.cachePylogn.delete(key);
            }
            RtgApiService.cachePylogn.set(key, scDatas.polygon);
            resolve(scDatas.polygon);
          });
      }
    });
  }

  public getTopoElementDatas(type: string, id: string): any {
    return new Promise((resolve, reject) => {
      const key = type + '§' + id;
      if (RtgApiService.cacheDatas.has(key)) {
        resolve(RtgApiService.cacheDatas.get(key));
      } else {
        this.getDatas(type, [id])
          .then((datas: any[]) => {
            if (datas.length === 1) {
              // on ajoute le type dans les donnés non fournis par l'API
              datas[0].type = type;
              resolve(datas[0]);
            }
          });
      }
    });
  }
  public getTopoElementsDatas(type: string, ids: string[]): any {
    return this.getDatas(type, ids);
  }

  public getImgUrl(type: string, size: string, id: string): string {
    return RtgApiService.apiUrl + '/bddimg/' + type + '/' + size.toUpperCase() + '.' + id + '.jpg';
  }
  public getList(type: string) {
    return this.getDatas('listjson' + type, []);
  }

  private getDatas(type: string, ids: string[]) {
    const formData = new FormData();
    formData.append('type', type);

    const responseFromCache = [];
    let allInCache = true;
    if (ids.length > 0) {
      ids.forEach(id => {
        const key = type + '§' + id;
        if (RtgApiService.cacheDatas.has(key)) {
          // console.log('IS in cache', type, ids, RtgApiService.cacheDatas.get(key));
          responseFromCache.push(RtgApiService.cacheDatas.get(key));
        } else {
          // console.log('not in cache', type, ids, RtgApiService.cacheDatas);
          allInCache = false;
        }
        formData.append('id[]', id);
      });
    } else {
      const key = type + '§';
      if (RtgApiService.cacheDatas.has(key)) {
        // console.log('IS in cache', type, ids, RtgApiService.cacheDatas.get(key));
        return new Promise((resolve) => {
          resolve(RtgApiService.responseFromCache);
        });
      } else {
        // console.log('not in cache', type, ids, RtgApiService.cacheDatas);
        allInCache = false;
      }
    }
    if (allInCache) {
      // console.log('allInCache get from cache', type, ids, responseFromCache);
      return new Promise((resolve) => {
        resolve(responseFromCache);
      });
    } else {
      return fetch(RtgApiService.apiUrl + '/rpc/rtg_getdatas.php', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then(datas => {
          // console.log(datas);
          if (!!datas.multi) {
            let key;
            // console.log('datas.multi', datas.multi);
            datas.multi.forEach((data) => {
              key = type + '§' + data.id;
              if (RtgApiService.cacheDatas.has(key)) {
                RtgApiService.cacheDatas.delete(key);
              }
              RtgApiService.cacheDatas.set(key, data);
            });
          }
          // pour les appels "non ids"
          if (ids.length === 0) {
            const key = type + '§';
            if (RtgApiService.cacheDatas.has(key)) {
              RtgApiService.cacheDatas.delete(key);
            }
            // console.log('set cache ', key, datas);
            RtgApiService.cacheDatas.set(key, datas);
            return new Promise((resolve) => {
              resolve(datas);
            });
          }
          return new Promise((resolve) => {
            resolve(datas.multi);
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }


  private fetchMapsDatas(mapsOptions: any) {
    const formData = new FormData();
    Object.keys(mapsOptions).forEach(key => {
      // console.log('key : ' + key + '=' + mapsOptions[key]);
      formData.append(key, mapsOptions[key]);
    });

    return fetch(RtgApiService.apiUrl + '/rpc/rtg_refreshMap.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .catch(err => { console.error(err); } );
  }

}
