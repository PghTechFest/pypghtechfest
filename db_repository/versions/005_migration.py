from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
room = Table('room', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('sortOrder', Integer),
    Column('roomName', String(length=30)),
)

time_slot = Table('time_slot', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('sortOrder', Integer),
    Column('timeSlotName', String(length=30)),
)

schedule_slot = Table('schedule_slot', pre_meta,
    Column('id', INTEGER, primary_key=True, nullable=False),
    Column('talkId', INTEGER),
    Column('timeSlot', VARCHAR(length=30)),
    Column('room', VARCHAR(length=30)),
)

schedule_slot = Table('schedule_slot', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('talkId', Integer),
    Column('timeSlotId', Integer),
    Column('roomId', Integer),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['room'].create()
    post_meta.tables['time_slot'].create()
    pre_meta.tables['schedule_slot'].columns['room'].drop()
    pre_meta.tables['schedule_slot'].columns['timeSlot'].drop()
    post_meta.tables['schedule_slot'].columns['roomId'].create()
    post_meta.tables['schedule_slot'].columns['timeSlotId'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['room'].drop()
    post_meta.tables['time_slot'].drop()
    pre_meta.tables['schedule_slot'].columns['room'].create()
    pre_meta.tables['schedule_slot'].columns['timeSlot'].create()
    post_meta.tables['schedule_slot'].columns['roomId'].drop()
    post_meta.tables['schedule_slot'].columns['timeSlotId'].drop()
