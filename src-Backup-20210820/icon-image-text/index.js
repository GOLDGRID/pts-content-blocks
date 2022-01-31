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
import PTSIconBGColorSelect from '../components/PTSIconBGColorSelect.jsx';
import PTSIconColorSelect from '../components/PTSIconColorSelect.jsx';
import PTSIconSelect from '../components/PTSIconSelect.jsx';

 /**
  * Register block
  */
 registerBlockType( 'pts-content-block/icon-image-text',
     {
         title: __( 'Icon-Bild-Text', 'pts-content-block' ),
        
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
            selectedIconBG: {
                type: 'string',
                default: 'bg-pts-violett',
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
            },
            imageAlt: {
                attribute: 'alt',
                selector: '.card__image'
            },
            imageUrl: {
                attribute: 'src',
                 selector: '.card__image'
            },
            imageCopyright: {
                type: 'string',
                source: 'html',
				selector: '.image-copyright',
            }
		},
        //supports: {
        //    align: ['wide', 'full']
        //},

 
        edit( props ) {
            const {
                attributes,
                className,
                setAttributes
            } = props;

            const allowedBlocks = ['core/button','core/list','core/spacer'];
        
            function changeTitle( newTitle ) {
                setAttributes( { title: newTitle } );
            }
        
            function changeDescription( newDescription ) {
                setAttributes( { description: newDescription } );
            }

            function changeCopyright( newCopyright ) {
                setAttributes( { imageCopyright: newCopyright } );
            }

            const getImageButton = (openEvent) => {
                if(attributes.imageUrl) {
                  return (
                    <img 
                      src={ attributes.imageUrl }
                      onClick={ openEvent }
                      className="image"
                    />
                  );
                }
                else {
                  return (
                    <div className="button-container">
                      <Button 
                        onClick={ openEvent }
                        className="btn btn-lg"
                      >
                        Bitte Bild wählen
                      </Button>
                    </div>
                  );
                }
            };

            return [
                
                <InspectorControls>
                    <PanelBody title={ __( 'Blockdarstellung anpassen', 'pts-block' ) }>
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
                
                    <div className="row no-gutters">
                        
                        <div class={attributes.selectedView == 'right' ?  "col-3 col-md-1 col-lg-2 order-3" : "col-3 col-md-1 col-lg-2 "}>
                            <div class={attributes.selectedIcon !== '' ? "icon " + attributes.selectedIcon + " " + attributes.selectedIconColor + " " + attributes.selectedIconBG : "icon" + " " + attributes.selectedIconBG}>
                                <img src={cgbGlobal.pluginDirUrl + "src/img/blank-square.png"} class="img-icon" alt="" />
                            </div>
                        </div>

                        <div class={attributes.selectedView == 'right' ? "col-9 col-md-5 col-lg-4 order-2" : "col-9 col-md-5 col-lg-4"}>
                            <MediaUpload
                                onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
                                type="image"
                                value={ attributes.imageID }
                                render={ ({ open }) => getImageButton(open) }
                            />
                            <RichText
                                tagName="p"
                                value={ attributes.imageCopyright }
                                className="image-copyright"
                                onChange={ changeCopyright }
                                placeholder={ __( 'Copyright Bild (optional)', 'gt-blocks' ) }
                            />
                        </div>
                        
                        <div className={attributes.selectedView == 'right' ? "col-12 col-md mb-2 mb-md-0 pb-2 pr-md-4 order-1" : "col-12 col-md mt-3 mt-md-0 pb-2 pl-md-4"}>
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

            const cardImage = (src, alt) => {
                if(!src) return null;
            
                if(alt) {
                  return (
                    <img 
                      className="img-fluid" 
                      src={ src }
                      alt={ alt }
                    /> 
                  );
                }
                
                // No alt set, so let's hide it from screen readers
                return (
                  <img 
                    className="img-fluid" 
                    src={ src }
                    alt=""
                    aria-hidden="true"
                  /> 
                );
            };
        
            return (
                <div>
                    <div className="row no-gutters">
                         
                        <div class={attributes.selectedView == 'right' ?  "col-3 col-md-1 col-lg-2 order-3" : "col-3 col-md-1 col-lg-2 "}>
                            <div class={attributes.selectedIcon !== '' ? "icon " + attributes.selectedIcon + " " + attributes.selectedIconColor + " " + attributes.selectedIconBG : "icon" + " " + attributes.selectedIconBG}>
                                <img src={cgbGlobal.pluginDirUrl + "src/img/blank-square.png"} class="img-icon" alt="" />
                            </div>
                        </div>

                        <div class={attributes.selectedView == 'right' ? "col-9 col-md-5 col-lg-4 order-2" : "col-9 col-md-5 col-lg-4"}>
                            { cardImage(attributes.imageUrl, attributes.imageAlt) }
                            {attributes.imageCopyright.length > 0 && (
                                <RichText.Content
                                tagName="p"
                                className="image-copyright"
                                value={ attributes.imageCopyright }
                            />
                            )}
                        </div>

                        <div className={attributes.selectedView == 'right' ? "col-12 col-md mb-2 mb-md-0 pb-2 pr-md-4 order-1" : "col-12 col-md mt-3 mt-md-0 pb-2 pl-md-4"}>
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