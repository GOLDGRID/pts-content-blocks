/**
 * WordPress dependencies
 */
 const { registerBlockType } = wp.blocks;
 const { __ } = wp.i18n;
 const { PanelBody, Button, RadioControl } = wp.components;
 const { RichText, MediaUpload, InspectorControls, InnerBlocks } = wp.blockEditor;
 //const { withState } = wp.compose;

 /**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

/**
* import Custom Components for InspectorControls
*/
import PTSBGColorSelect from '../components/PTSBGColorSelect.jsx';
import PTSIconBGColorSelect from '../components/PTSIconBGColorSelect.jsx';
import PTSIconColorSelect from '../components/PTSIconColorSelect.jsx';
import PTSIconSelect from '../components/PTSIconSelect.jsx';

 /**
  * Register block
  */
 registerBlockType( 'pts-content-block/icon-text',
     {
         title: __( 'Icon-Text', 'pts-content-block' ),
        
         icon: 'welcome-widgets-menus', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
         category: 'pts-category',

         attributes: {
			title: {
				type: 'string',
				source: 'html',
				selector: '.pts-title',
			},
			description: {
				type: 'string',
				source: 'html',
				selector: '.pts-description',
			},
            selectedBGColor: {
                type: 'string',
                default: 'pts-white',
            },
            selectedIconBG: {
                type: 'string',
                default: 'pts-white',
            },
            selectedIcon: {
                type: 'string',
                default: 'icon-01',
            },
            selectedIconColor: {
                type: 'string',
                default: 'color-pts-white',
            },
            selectedView: {
                type: 'string',
                default: 'left',
            }
		},
        //supports: {
        //    align: ['wide', 'full']
        //},

 
        edit( props ) {
            const {
                attributes,
                className,
                setAttributes,
            } = props;

            const allowedBlocks = ['core/button'];
        
            function changeTitle( newTitle ) {
                setAttributes( { title: newTitle } );
            }
        
            function changeDescription( newDescription ) {
                setAttributes( { description: newDescription } );
            }

            return [
                
                <InspectorControls>
                    <PanelBody title={ __( 'Blockdarstellung anpassen', 'pts-block' ) }>
                        <PTSBGColorSelect
                            value={ props.attributes.selectedBGColor }
                            onChangeBGColor={val => { setAttributes({ selectedBGColor: val }); }}
                        />
                        <PTSIconSelect
                            value={ props.attributes.selectedIcon }
                            onChangeIcon={val => { setAttributes({ selectedIcon: val }); }}
                        />
                        <PTSIconColorSelect
                            value={ props.attributes.selectedIconColor }
                            onChangeBGColor={val => { setAttributes({ selectedIconColor: val }); }}
                        />
                        <PTSIconBGColorSelect
                            value={ props.attributes.selectedIconBG }
                            onChangeBGColor={val => { setAttributes({ selectedIconBG: val }); }}
                        />
                        <RadioControl
                            label="Icon Links / Icon rechts"
                            help="Soll das Icon auf der linken oder auf der rechten Seite dargestellt werden?"
                            selected={ props.attributes.selectedView }
                            options={ [
                                { label: 'Icon Links', value: 'left' },
                                { label: 'Icon Rechts', value: 'right' },
                            ] }
                            onChange={val => { setAttributes({ selectedView: val }); }}
                        />
                    </PanelBody>
				</InspectorControls>,

                <div className={ className }>
                
                    <div className={attributes.selectedBGColor + " row no-gutters"}>
                        
                        <div class={attributes.selectedView == 'right' ?  "col-12 col-sm-3 col-lg-2 col-icon order-2" : "col-12 col-sm-3 col-lg-2 col-icon"}>
                            <div class={attributes.selectedIcon !== '' ? "icon " + attributes.selectedIcon + " " + attributes.selectedIconColor + " " + attributes.selectedIconBG : "icon" + " " + attributes.selectedIconBG}>
                                <img src={cgbGlobal.pluginDirUrl + "src/img/blank-square.png"} class="img-icon" alt="" />
                            </div>
                        </div>
                        
                        <div className={attributes.selectedView == 'right' ? "col-12 col-sm col-text mb-2 mb-md-0 py-2 px-4 order-1" : "col-12 col-sm col-text mt-3 mt-md-0 py-2 px-4"}>
                            <RichText
                                tagName="h2"
                                value={ attributes.title }
                                className="pts-title"
                                onChange={ changeTitle }
                                placeholder={ __( 'Überschrift', 'gt-blocks' ) }
                                keepPlaceholderOnFocus
                            />
                            <RichText
                                tagName="p"
                                value={ attributes.description }
                                className="pts-description"
                                onChange={ changeDescription }
                                placeholder={ __( 'Fließtext', 'gt-blocks' ) }
                                keepPlaceholderOnFocus
                            />
                            <InnerBlocks
                                allowedBlocks={ allowedBlocks }
                            />
                        </div>
                    </div>

                </div>
            ];
        },
 
        save( { attributes } ) {
            const {
                title,
                description,
            } = attributes;

        
            return (
                <div>
                    <div className={attributes.selectedBGColor + " row no-gutters"}>
                         
                        <div class={attributes.selectedView == 'right' ?  "col-12 col-sm-3 col-lg-2 col-icon order-2" : "col-12 col-sm-3 col-lg-2 col-icon"}>
                            <div class={attributes.selectedIcon !== '' ? "icon " + attributes.selectedIcon + " " + attributes.selectedIconColor + " " + attributes.selectedIconBG : "icon" + " " + attributes.selectedIconBG}>
                                <img src={cgbGlobal.pluginDirUrl + "src/img/blank-square.png"} class="img-icon" alt="" />
                            </div>
                        </div>

                        <div className={attributes.selectedView == 'right' ? "col-12 col-sm col-text mb-2 mb-md-0 py-2 px-4 order-1" : "col-12 col-sm col-text mt-3 mt-md-0 py-2 px-4"}>
                            <RichText.Content
                                tagName="h2"
                                className="pts-title"
                                value={ title }
                            />
        
                            <RichText.Content
                                tagName="p"
                                className="pts-description"
                                value={ description }
                            />
                            <InnerBlocks.Content />
                        </div>
                    </div>
                    
                </div>
            );
        },
     }
 );