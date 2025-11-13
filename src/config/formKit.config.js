import { applicationIcons, ethereum } from "@formkit/icons"
import { createAutoAnimatePlugin, createAutoHeightTextareaPlugin  } from "@formkit/addons"
import { es, en } from '@formkit/i18n'

export default {
    locales: { es, en },
    locale: 'es',
    config:{
        classes:{
            input: 'form-control',
            inner:'input-group',
            prefix: 'input-group-text',
            suffix: 'input-group-text',
            prefixIcon: 'input-group-text',
            suffixIcon: 'input-group-text',
            messages:'text-danger px-0 mb-0',
            message: 'list-group-item'
        },
        icons:{
            ...applicationIcons,
            ethereum
        },
    },
    plugins:[
        createAutoAnimatePlugin(),
        createAutoHeightTextareaPlugin()
    ]
}
