import { Iterable } from 'immutable';
import remarkableStripper from 'app/utils/RemarkableStripper';
import sanitize from 'sanitize-html';
import { htmlDecode } from 'app/utils/Html';
import HtmlReady from 'shared/HtmlReady';
import Remarkable from 'remarkable';

const remarkable = new Remarkable({ html: true, linkify: false });

const getValidImage = image => {
    if (!image) {
        return null;
    }
    if (
        Array.isArray(image) &&
        image.length >= 1 &&
        typeof image[0] === 'string'
    ) {
        return image[0];
    }
    if (typeof image === 'string') {
        return image;
    }
    return null;
};

export function extractImageLink(json_metadata, appDomain, hive, body = null) {
    let json = Iterable.isIterable(json_metadata)
        ? json_metadata.toJS()
        : json_metadata;
    if (!json) json = {};
    let image_link;

    try {
        image_link = json && json.image ? getValidImage(json.image) : null;
    } catch (error) {}

    // If nothing found in json metadata, parse body and check images/links
    if (!image_link) {
        let rtags;
        {
            const isHtml = /^<html>([\S\s]*)<\/html>$/.test(body);
            const htmlText = isHtml
                ? body
                : remarkable.render(
                      body.replace(
                          /<!--([\s\S]+?)(-->|$)/g,
                          '(html comment removed: $1)'
                      )
                  );
            rtags = HtmlReady(htmlText, {
                mutate: false,
                appDomain,
                useHive: hive,
            });
        }

        if (rtags.images) {
            [image_link] = Array.from(rtags.images);
        }
    }

    // Was causing broken thumnails.  IPFS was not finding images uploaded to another server until a restart.
    // if(config.ipfs_prefix && image_link) // allow localhost nodes to see ipfs images
    //     image_link = image_link.replace(links.ipfsPrefix, config.ipfs_prefix)

    return image_link;
}

/**
 * Short description - remove bold and header, links with titles.
 *
 * if `strip_quotes`, try to remove any block quotes at beginning of body.
 */
export function extractBodySummary(body, strip_quotes = false) {
    let desc = body;

    if (strip_quotes)
        desc = desc.replace(/(^(\n|\r|\s)*)>([\s\S]*?).*\s*/g, '');
    desc = remarkableStripper.render(desc); // render markdown to html
    desc = sanitize(desc, { allowedTags: [] }); // remove all html, leaving text
    desc = htmlDecode(desc);

    // Strip any raw URLs from preview text
    desc = desc.replace(/https?:\/\/[^\s]+/g, '');

    // Grab only the first line (not working as expected. does rendering/sanitizing strip newlines?)
    desc = desc.trim().split('\n')[0];

    if (desc.length > 140) {
        desc = desc.substring(0, 341).trim();

        // Truncate, remove the last (likely partial) word (along with random punctuation), and add ellipses
        desc = desc
            .substring(0, 300)
            .trim()
            .replace(/[,!\?]?\s+[^\s]+$/, '…');
    }

    return desc;
}
