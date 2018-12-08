import { createStyles, Icon, SvgIcon, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  grow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexGrow: 1,
    width: '33%'
  },
  root: {
    height: '1.5em',
    width: '2.7em'
  }
});

export interface IHeaderTextProps extends WithStyles<typeof styles> {}

export const UnstyledHeaderText: React.SFC<IHeaderTextProps> = ({
  classes: { root, grow }
}) => (
  <span className={grow}>
    <Icon classes={{ root }} fontSize='large'>
      <SvgIcon
        fontSize='inherit'
        titleAccess='Justin and Marisa are getting'
        viewBox='0 0 211.83 89.86'
        classes={{ root }}
      >
        <path d='M3.2,25.62l.43-.08L3.82,28l2,11.47q2,13.83-1.22,14.42c0,.28-.58.54-1.87.78C1.24,54.66.32,53.78,0,52l.06-.91L.71,51c.64,1.54,1.23,2.26,1.76,2.16l1.3-.23q2.6-.48.65-13.9l0-.19L2.54,28.22C2.53,26.57,2.75,25.7,3.2,25.62Z' />
        <path d='M17.3,35.34l.51.38-.11,1.82.12.68.51,1.71q1.26,11.94-1.55,12.45T10.58,42l-.23-1.3c-.2-1.11,0-1.81.52-2.1l.45-.09.73.31,0,1.56.39,2.17A20.18,20.18,0,0,0,16,50.72l.46-.08c.94-.6,1.09-3.47.45-8.64l-.4-2.21a5.73,5.73,0,0,0-.87-2.34C15.47,36.52,16,35.82,17.3,35.34Z' />
        <path d='M28,31.3l.28.21.08.43c-2.41,2.46-3.43,4.75-3,6.86l.08.46q.42,2.33,4.91,5.85l.35.85a6.08,6.08,0,0,1-5.37,5.25q-2.39.43-2.7-1.32l2.65-.23.89-.16q2.92-1.3,2.59-3.18l-.05-.24c-.06-.36-1.39-1.84-4-4.45l-1.09-2.32q-.72-4,4-7.94Z' />
        <path d='M32.63,22.33l.48-.12.38,1.54,0,.23c.6,3.33,1.12,5,1.55,4.89l2-1.1q.3.42.6.87c-.22.28-.26.44-.1.47l-2.38,1.78,2.51,11.28.16.86a30.94,30.94,0,0,1,.48,5.24l-1,.12L36.64,45l-1-5.41-.44-2.4q-1-5.66-1.67-5.54l-2,.52L30.81,32l0-.53.36-.16.43-.08q2-.67,1.8-1.83L31.73,23l.2-.23Z' />
        <path d='M42.36,26.42a2.07,2.07,0,0,1,1.71.59c.07.43-.35,1-1.28,1.8-.39.07-.81-.22-1.26-.86C41.66,27.09,41.94,26.59,42.36,26.42Zm1,5.69.84.76q-.7,1,0,5A30.6,30.6,0,0,0,47,45.65l.08.44-.51.79-.65.12q-1,.2-3.43-10-.83-4.57.5-4.81Z' />
        <path d='M52.88,25.76l.19,0q2.58-.46,4.84,9.25l.71,4,.67,2.34-.07.93.59,1.93-.6.53a1.41,1.41,0,0,1-1.35-1.32l-1.31-7.22q-1.38-7.63-3-8l-.19,0q-2.12,1.63-1.12,10.13l1.11,6.12.4.84c-.15.92-.37,1.4-.65,1.45A1.21,1.21,0,0,1,51.56,46l-.83-5.92L48.3,30.39l-.24-1.3.72-1c.61.1.94.27,1,.49l.37,3.31.26.18.43-.08A7.21,7.21,0,0,1,52.88,25.76Z' />
        <path d='M85.8,21.81l.68-.12.73.34.35,3.29c1.81,7.66,3.17,11.42,4.08,11.25l.43-.07,0,.18a1.53,1.53,0,0,1-.59,1.73l-.88.16c-.58.1-1.38-1.41-2.39-4.55l-.22,0c0,5.12-.8,7.84-2.57,8.16q-1.52.27-2.36-4.36l-.43-2.37q-1.81-10.07,1.62-12C84.7,23.39,85.2,22.84,85.8,21.81ZM84.06,34.54l.55,3.05c.29,1.61.65,2.37,1.08,2.3q1.43-.27.79-11.87l0-.23c-.48-2-.88-3-1.2-2.95l-.68.12Q82.39,25.35,84.06,34.54Z' />
        <path d='M98.26,17.53l.19,0q2.58-.46,4.84,9.24l.71,4,.67,2.35-.07.92.59,1.94-.6.53a1.41,1.41,0,0,1-1.35-1.32l-1.31-7.23q-1.38-7.62-3.05-8l-.19,0q-2.13,1.62-1.12,10.13l1.11,6.11.4.84c-.15.92-.37,1.41-.66,1.46a1.21,1.21,0,0,1-1.48-.64l-.83-5.93-2.43-9.72-.24-1.3.71-1c.62.11.95.27,1,.49l.37,3.32.26.18.43-.08A7.24,7.24,0,0,1,98.26,17.53Z' />
        <path d='M112.28,9.9a1.41,1.41,0,0,1,1.71.8l-.16,1.63q4.55,22.07,4.92,21.47l-.62.65a7.23,7.23,0,0,0-1-.22l-1.85-9.08L115,25l-.22,0q.33,9.42-2.29,9.9l-.43.08q-2.62.47-3.57-4.78c-.46-2.54.33-5.24,2.38-8.12,2-.84,2.83-1.82,2.63-2.94L113,16.09l-1.36-5C111.76,10.43,112,10,112.28,9.9ZM110.09,29l.4,2.16q.3,1.7,1.5,2l.19,0q1.3-.24,1.33-10.18l-.23-.19-.87.16A6.27,6.27,0,0,0,110.09,29Z' />
        <path d='M147.43.15c.94.19,1.48.63,1.61,1.32l5.63,22.44.28,1.53c.13.75,0,1.22-.42,1.41l-.45.09-.73-.31L153,23.31l-.13-.68A96.55,96.55,0,0,0,148.5,6.08l-.21,0A105.66,105.66,0,0,0,148.06,21l-1.21.87q-1.2.22-2.54-5.38-3.74-6.84-4.48-7.31l-.22,0,.81,3.23.72,4q2.49,13.76,1.17,14l-.65.12-.42-1.07-.76-9.11-.22,0,.18-.25-.51-2.85Q138,6.91,137.14,5.64c.16-.73.39-1.14.69-1.24l.65-.12q1.1-.12,3.81,6.07a36.63,36.63,0,0,1,3.73,7l.68-.12.4-13.85L147,2.74l-.43-1.29c-.1-.58.2-.93.92-1.06Z' />
        <path d='M162.11,8l.68-.12.73.34.35,3.28Q166.6,23,168,22.74l.43-.08,0,.19a1.57,1.57,0,0,1-.59,1.73l-.89.16c-.58.1-1.37-1.41-2.39-4.55l-.22,0c.06,5.12-.8,7.83-2.57,8.16-1,.18-1.8-1.27-2.35-4.36L159,21.66q-1.83-10.07,1.62-12C161,9.55,161.51,9,162.11,8Zm-1.74,12.73.55,3c.29,1.62.66,2.38,1.09,2.31q1.43-.27.79-11.87l-.05-.23c-.47-2-.87-3-1.2-3l-.68.12Q158.71,11.52,160.37,20.71Z' />
        <path d='M176.13,5.35l.64-.12,1,.72.08.45-.38.51-1.12,0q-2.66,5.25-1.9,9.37l.63,3.49.64,2.38c.11.59-.2.95-.91,1.08l0,.19c-.62-.11-.95-.28-1-.49l-.44-2.4q-2.72-10.32-3.23-10.24c.14-.93.35-1.43.63-1.48l.22,0a1.5,1.5,0,0,1,1.17,1.39l.43,2.4.23,0Q174.23,7.38,176.13,5.35Z' />
        <path d='M182.84,1a2,2,0,0,1,1.7.59c.08.43-.34,1-1.27,1.8-.39.07-.81-.22-1.27-.86C182.14,1.63,182.42,1.13,182.84,1Zm1,5.69.84.76q-.72,1,0,4.95a30.22,30.22,0,0,0,2.74,7.83l.08.44-.51.79-.65.12q-1.05.2-3.43-10-.83-4.57.5-4.81Z' />
        <path d='M195.24,1l.28.21.08.43q-3.61,3.69-3,6.87l.09.46q.42,2.33,4.91,5.85l.35.85a6.1,6.1,0,0,1-5.37,5.25q-2.39.44-2.7-1.32l2.65-.24.89-.16c1.95-.87,2.81-1.92,2.59-3.18l-.05-.23c-.06-.36-1.39-1.85-4-4.46L190.85,9q-.72-4,4-7.93Z' />
        <path d='M205.48.12l.68-.12.73.34.35,3.28q2.73,11.51,4.08,11.26l.43-.08,0,.19a1.55,1.55,0,0,1-.58,1.73l-.89.16c-.58.1-1.37-1.41-2.39-4.55l-.22,0q.09,7.68-2.57,8.16-1.51.27-2.36-4.36l-.43-2.37q-1.82-10.07,1.63-12C204.38,1.69,204.88,1.15,205.48.12Zm-1.74,12.73.55,3.05c.29,1.61.66,2.37,1.09,2.3q1.43-.27.79-11.87l0-.23c-.47-2-.87-3-1.2-2.95l-.68.12Q202.07,3.66,203.74,12.85Z' />
        <path d='M51.21,68.2l.68-.12.73.34L53,71.7Q55.69,83.21,57.05,83l.42-.08,0,.19a1.54,1.54,0,0,1-.59,1.72L56,85c-.58.11-1.38-1.41-2.39-4.54l-.22,0c0,5.11-.8,7.83-2.57,8.15-1,.18-1.8-1.27-2.36-4.36l-.43-2.37q-1.83-10.07,1.62-12C50.1,69.77,50.61,69.22,51.21,68.2ZM49.46,80.92,50,84c.29,1.61.65,2.38,1.08,2.3q1.42-.26.79-11.86l0-.24c-.48-2-.88-3-1.21-3l-.67.12C48.52,71.61,48.36,74.8,49.46,80.92Z' />
        <path d='M65.22,65.56l.65-.12,1,.73.08.44-.38.51-1.11,0q-2.66,5.25-1.91,9.38L64.22,80l.65,2.38c.1.59-.2,1-.92,1.08l0,.19c-.62-.12-1-.28-1-.49l-.44-2.4q-2.72-10.34-3.22-10.24c.13-.94.34-1.44.63-1.49l.22,0a1.5,1.5,0,0,1,1.16,1.39l.44,2.4.22,0Q63.32,67.59,65.22,65.56Z' />
        <path d='M74.81,62.86c2.46.26,3.83,1.22,4.13,2.86l.12.65a6.88,6.88,0,0,1-3.15,7.55l-1.49.27.08.46C75,77.27,76,79,77.44,79.77l.68-.13c.82-.14,1.77-1.52,2.86-4.12l.22.15.24,0c-.44,3.55-1.59,5.5-3.47,5.84q-2.55.45-5.79-8.21c-.23,0-.44-.3-.63-1q.77-.84.54-6Q73.25,63.14,74.81,62.86Zm-1.15,8.57c.25.69.55,1,.87.95l1.33-.24c1.6-1.14,2.17-3,1.71-5.5l0-.23q-.72-2.1-2.4-1.8Q72.51,65.09,73.66,71.43Z' />
        <path d='M111.08,57l.41-.08.8.53.2,1.09a15.5,15.5,0,0,0-.24,7.5l2.6,12.83q1.79,9.84-1.3,10.4c.06.29-.29.5-1,.63-1.82,0-2.84-.69-3.06-1.93l0-.22.42-.07a4.6,4.6,0,0,0,2.64.65q2.39-.44,1.08-7.64L111.63,70l-.47-1.53-.46.09q-.54,6.41-3.68,7l-.25,0c-.51,0-1.2-1-2.08-3a18.09,18.09,0,0,1,2-12.35l3.07-1.87C109.63,57.6,110.07,57.14,111.08,57ZM106,69.62l.64,3.49c.07.44.4.6,1,.49q1.79-.31,2.48-11.28l-.35-2q-3.74.68-3.88,7.46Z' />
        <path d='M120.29,54.62c2.45.26,3.83,1.21,4.12,2.86l.12.64a6.89,6.89,0,0,1-3.15,7.56l-1.49.27.09.46q.7,3.91,2.93,5.12l.68-.13c.82-.15,1.78-1.52,2.86-4.12l.22.15.24,0c-.43,3.55-1.59,5.49-3.46,5.83q-2.57.47-5.8-8.2c-.23,0-.44-.3-.62-1,.51-.56.68-2.55.53-6Q118.73,54.9,120.29,54.62Zm-1.16,8.57c.26.69.55,1,.87,1l1.33-.24q2.4-1.71,1.71-5.51l0-.22c-.48-1.4-1.28-2-2.39-1.8Q118,56.85,119.13,63.19Z' />
        <path d='M129.22,44.94l.49-.13.37,1.55,0,.22q.91,5,1.56,4.9l2-1.1q.31.42.6.87c-.22.28-.25.44-.09.47l-2.39,1.77,2.52,11.28.16.87a30.68,30.68,0,0,1,.47,5.24l-1,.12-.68-3.39-1-5.4-.43-2.4c-.69-3.77-1.24-5.62-1.67-5.54l-2,.52-.77-.16,0-.53.36-.16.43-.08c1.34-.45,2-1.06,1.81-1.83l-1.65-6.46.21-.23Z' />
        <path d='M138,43.35l.48-.12.38,1.54,0,.22q.92,5,1.56,4.9l2-1.1q.3.42.6.87c-.22.28-.25.44-.09.47l-2.39,1.78,2.52,11.28.15.86a29.93,29.93,0,0,1,.48,5.24l-1,.12L142,66l-1-5.41-.43-2.4q-1-5.65-1.68-5.54l-2,.52-.76-.16,0-.53.36-.16.43-.08c1.34-.45,1.95-1.06,1.81-1.83L137.09,44l.2-.23Z' />
        <path d='M147.72,47.44a2.07,2.07,0,0,1,1.71.59c.08.43-.35,1-1.28,1.8q-.59.11-1.26-.87C147,48.11,147.3,47.6,147.72,47.44Zm1,5.69.84.76q-.71,1,0,5a30.6,30.6,0,0,0,2.74,7.83l.08.44-.51.79-.65.12q-1,.2-3.42-10-.84-4.58.5-4.81Z' />
        <path d='M158.24,46.78l.19,0q2.59-.47,4.84,9.24l.72,4,.67,2.34-.08.93.59,1.93-.6.53a1.41,1.41,0,0,1-1.35-1.32l-1.31-7.22q-1.38-7.64-3-8l-.19,0q-2.11,1.64-1.12,10.13l1.11,6.12.4.84c-.15.92-.37,1.4-.65,1.45a1.21,1.21,0,0,1-1.49-.64l-.83-5.92-2.43-9.73-.24-1.3.72-1c.61.1.94.27,1,.49l.38,3.31.26.18.42-.08A7.21,7.21,0,0,1,158.24,46.78Z' />
        <path d='M174.64,45.44l.41-.08.8.53.2,1.09a15.5,15.5,0,0,0-.24,7.5l2.6,12.83q1.78,9.84-1.3,10.4c.06.29-.29.5-1,.63-1.81,0-2.83-.69-3.05-1.92l0-.23.42-.07a4.49,4.49,0,0,0,2.63.65c1.59-.29,2-2.84,1.08-7.64l-1.93-10.69-.48-1.53-.45.09q-.54,6.41-3.68,7l-.26.05c-.5,0-1.2-1-2.07-3a18,18,0,0,1,2-12.34l3.08-1.88C173.19,46.08,173.63,45.62,174.64,45.44ZM169.51,58.1l.63,3.49c.08.44.41.6,1,.49q1.78-.31,2.48-11.28l-.36-1.95q-3.72.67-3.87,7.46Z' />
      </SvgIcon>
    </Icon>
  </span>
);

export const HeaderText = withStyles(styles)(UnstyledHeaderText);
