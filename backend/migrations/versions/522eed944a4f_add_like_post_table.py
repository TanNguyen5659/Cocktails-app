"""add like post table

Revision ID: 522eed944a4f
Revises: 98a0fb55be5d
Create Date: 2024-03-27 16:28:44.475941

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '522eed944a4f'
down_revision = '98a0fb55be5d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('like_post',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['post_model.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('like_post')
    # ### end Alembic commands ###
