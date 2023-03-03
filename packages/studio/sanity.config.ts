import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { colorInput } from '@sanity/color-input';
import { documentI18n } from '@sanity/document-internationalization';
import { schemaTypes } from './schemas';

import { RiPagesLine } from 'react-icons/ri';
import { BiNavigation } from 'react-icons/bi';
import { HiOutlineHome, HiOutlineDocumentText, HiCode, HiOutlineCog } from 'react-icons/hi';
import { ImLab } from 'react-icons/im';

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'pb6axv26',
  dataset: 'production',
  plugins: [deskTool({
    structure: (S, context) => {
      return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .icon(RiPagesLine)
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Homepage')
                      .icon(HiOutlineHome)
                      .child(
                        S.document()
                          .schemaType('homePage')
                          .documentId('homePage')
                          .title('Homepage')
                      ),
                    S.listItem()
                      .title('Simple Pages')
                      .icon(HiOutlineDocumentText)
                      .child(
                        S.documentTypeList('page')
                          .title('Simple Pages')
                      )
                  ])
              ),
            S.divider(),
            orderableDocumentListDeskItem({
              type: 'work',
              title: 'Work',
              icon: HiCode,
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects',
              icon: ImLab,
              S,
              context,
            }),
            S.divider(),
            orderableDocumentListDeskItem({
              type: 'navigation',
              title: 'Navigation',
              icon: BiNavigation,
              S,
              context,
            }),
            S.listItem()
              .title('General Settings')
              .icon(HiOutlineCog)
              .child(
                S.document()
                  .schemaType('config')
                  .documentId('config')
                  .title('General Settings')
              ),
          ]);
    }
  }), visionTool(), colorInput(), documentI18n({
    base: 'pt',
    languages: ['pt', 'en'],
  })],

  schema: {
    types: schemaTypes,
  },
})
