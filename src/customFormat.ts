import { PluginSettings } from "./setting";

interface IImgInfo { // Picgo
    buffer?: Buffer;
    base64Image?: string;
    fileName?: string;
    width?: number;
    height?: number;
    extname?: string;
    imgUrl?: string;
    [propName: string]: any;
}

interface IPackImgInfo extends IImgInfo {
    _packInfo?: {
        imageList: {
            imgUrl: string,
            imgWebType: string
        }[],
        sourceImageUrl: string
    }
}

export interface ICustomImgLinkSettings {
    customImgLinkFormat: CustomImgLinkFormat;
    fallbackLinkFormat: CustomImgLinkFormat;
    asyncLoad: boolean;
    lazyLoad: boolean;
}

export enum CustomImgLinkFormat {
    markdown = 'markdown',
    html = 'html',
    raw = 'raw'
}

export const getCustomImgLink = (name: string, imgUrl: string, settings: PluginSettings) => {
    const setting: ICustomImgLinkSettings = settings.customImgLink;
    switch (setting.customImgLinkFormat) {
        case CustomImgLinkFormat.raw:
            return imgUrl;
        case CustomImgLinkFormat.markdown:
            return `![${name}](${imgUrl})`;
        case CustomImgLinkFormat.html: {
            const info: IPackImgInfo = settings.uploadedImages?.find(
                (item: IPackImgInfo) => item.imgUrl === imgUrl
            );
            if (!info) return setting.fallbackLinkFormat == CustomImgLinkFormat.raw ? imgUrl : `![${name}](${imgUrl})`;
            const sources: string = info._packInfo.imageList.map(p => `<source srcSet="${p.imgUrl}" type="${p.imgWebType}"/>`).join('');
            const asyncLoad = setting.asyncLoad ? ' decoding="async"' : '';
            const lazyLoad = setting.lazyLoad ? ' loading="lazy"' : '';
            const html =  `<picture>${sources}<img${asyncLoad}${lazyLoad} src="${info._packInfo.sourceImageUrl}"/></picture>`;
            return html;
        }
    }
};